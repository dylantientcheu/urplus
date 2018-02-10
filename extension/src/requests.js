export function getSubmissionInfo(data, axiosInstance, sendResponse) {
  axiosInstance({
    method: 'get',
    url: '/remarks/submission-info/',
    params: { submission_id: data.submissionId },
  })
    .then(sendResponse, sendResponse);
}

export function getSubmissionCritiques(data, axiosInstance, sendResponse) {
  axiosInstance({
    method: 'get',
    url: '/remarks/submission-critiques/',
    params: { submission_id: data.submissionId },
  })
    .then(sendResponse, sendResponse);
}

export function getRemarks(data, axiosInstance, sendResponse) {
  axiosInstance({
    method: 'get',
    url: '/remarks/all/',
    params: { project_name: data.projectName },
  })
    .then(sendResponse, sendResponse);
}

export function postRemark(data, axiosInstance, sendResponse) {
  axiosInstance({
    method: 'post',
    url: `/remarks/${data.remarkType}/`,
    data: {
      ...data.remark,
      project_name: data.projectName,
    },
  })
    .then(sendResponse, sendResponse);
}

export function patchRemark(data, axiosInstance, sendResponse) {
  axiosInstance({
    method: 'patch',
    url: `/remarks/${data.remarkType}/${data.remark.id}/`,
    data: data.remark,
  })
    .then(sendResponse, sendResponse);
}

export function deleteRemark(data, axiosInstance, sendResponse) {
  axiosInstance({
    method: 'delete',
    url: `/remarks/${data.remarkType}/${data.remark.id}/`,
  })
    .then(sendResponse, sendResponse);
}

export function incrementRemark(data, axiosInstance, sendResponse) {
  axiosInstance({
    method: 'post',
    url: `/remarks/${data.remarkType}/${data.remark.id}/increment/`,
  })
    .then(sendResponse, sendResponse);
}

export function getIncome(axiosInstance) {
  const now = new Date();
  const todayStart = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const monthStart = new Date(now.getUTCFullYear(), now.getUTCMonth(), 1);
  axiosInstance({
    method: 'get',
    baseURL: 'https://review-api.udacity.com/api/v1',
    url: `/me/submissions/completed.json?start_date=${monthStart.toISOString().slice(0, 10)}`,
  })
    .then((response) => {
      let dailyIncome = 0;
      let monthlyIncome = 0;
      response.data.forEach((review) => {
        monthlyIncome += parseFloat(review.price);
        if (review.completed_at >= todayStart.toISOString()) {
          dailyIncome += parseFloat(review.price);
        }
      });
      chrome.storage.local.set({ dailyIncome: (dailyIncome).toFixed(2) });
      chrome.storage.local.set({ monthlyIncome: (monthlyIncome).toFixed(2) });
    });
}

export function getActiveReview(axiosInstance) {
  axiosInstance({
    method: 'get',
    baseURL: 'https://review-api.udacity.com/api/v1',
    url: 'me/submissions/assigned.json',
  })
    .then((response) => {
      if (response.data.length === 0) {
        chrome.storage.local.set({ activeReview: null });
        chrome.browserAction.setBadgeText({ text: '' });
        return;
      }
      const activeReview = response.data[0];
      chrome.storage.local.set({ activeReview });
      chrome.browserAction.setBadgeText({ text: String(response.data.length) });
    });
}

export function runRecurring(data, axiosInstance) {
  getIncome(axiosInstance);
  getActiveReview(axiosInstance);
}
