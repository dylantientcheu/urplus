export function getCurrentSubmission(axiosInstance) {
  axiosInstance({
    method: 'get',
    baseURL: 'https://review-api.udacity.com/api/v1',
    url: 'me/submissions/assigned.json',
  })
    .then((response) => {
      if (response.data.length === 0) {
        chrome.storage.local.set({ currentSubmission: null });
        chrome.browserAction.setBadgeText({ text: '' });
        return;
      }
      const currentSubmission = response.data[0];
      chrome.storage.local.set({ currentSubmission });
      chrome.browserAction.setBadgeText({ text: String(response.data.length) });
    });
}

export function getMonthlyIncome(axiosInstance) {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthStartString = monthStart.toISOString().slice(0, 10);
  axiosInstance({
    method: 'get',
    baseURL: 'https://review-api.udacity.com/api/v1',
    url: `/me/submissions/completed.json?start_date=${monthStartString}`,
  })
    .then((response) => {
      let monthlyIncome = 0;
      response.data.forEach((project) => {
        monthlyIncome += project.price;
      });
      chrome.storage.local.set({ monthlyIncome });
    });
}

export function getAssignmentDashboard(axiosInstance) {
  axiosInstance({
    method: 'get',
    baseURL: 'https://localhost:8000/api/v1',
    url: '/assign/status/',
  })
    .then((response) => {
      const assignRunnerActive = response.data.assignRunnerActive;
      const assigningProjects = response.data.assigningProjects;
      chrome.storage.local.set({ assignRunnerActive });
      axiosInstance({
        method: 'get',
        baseURL: 'https://review-api.udacity.com/api/v1',
        url: '/me/submission_requests.json',
      })
        .then((response) => {
          if (response.data.length === 0) {
            chrome.storage.local.get('certs', (data) => {
              if ('certs' in data) {
                const certs = data.certs;
                certs.forEach((cert) => {
                  cert.assigning = false;
                  cert.wait = 0;
                  assigningProjects.forEach((project) => {
                    if (project.project_id === cert.project_id) {
                      cert.assigning = true;
                    }
                  });
                });
                chrome.storage.local.set({ certs });
              }
            });
            return;
          }
          axiosInstance({
            method: 'get',
            baseURL: 'https://review-api.udacity.com/api/v1',
            url: `/submission_requests/${response.data[0].id}/waits.json`,
          })
            .then((response) => {
              const waits = response.data;
              chrome.storage.local.get('certs', (data) => {
                if ('certs' in data) {
                  const certs = data.certs;
                  certs.forEach((cert) => {
                    cert.assigning = false;
                    cert.wait = 0;
                    assigningProjects.forEach((project) => {
                      if (project.project_id === cert.project_id) {
                        cert.assigning = true;
                      }
                    });
                  });
                  waits.forEach((wait) => {
                    const cert = certs
                      .filter(cert => cert.project_id === wait.project_id)[0];
                    cert.wait = wait.position;
                  });
                  chrome.storage.local.set({ certs });
                }
              });
            });
        });
    });
}
