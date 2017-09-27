export function init({ commit, dispatch }, { submissionId }) {
  return new Promise((resolve, reject) => {
    Promise.all([
      dispatch('setRemarks', { submissionId }),
      dispatch('setSubmissionCritiques', { submissionId }),
    ])
      .then(resolve)
      .catch(reject);
  });
}

export function setSubmissionInfo({ commit }, { submissionId }) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({
      func: 'getSubmissionInfo',
      data: { submissionId },
    }, (response) => {
      if (!response.data || response.status !== 200) reject('test');
      commit('setSubmissionInfo', { ...response.data });
      resolve();
    });
  });
}

export function setSubmissionCritiques({ commit }, { submissionId }) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({
      func: 'getSubmissionCritiques',
      data: { submissionId },
    }, (response) => {
      if (!response.data || response.status !== 200) reject();
      commit('setSubmissionCritiques', { ...response.data });
      resolve();
    });
  });
}

export function setRemarks({ commit, dispatch, state }, { submissionId }) {
  return new Promise((resolve, reject) => {
    dispatch('setSubmissionInfo', { submissionId })
      .then(() => {
        chrome.runtime.sendMessage({
          func: 'getRemarks',
          data: { projectName: state.projectName },
        }, (response) => {
          if (!response.data || response.status !== 200) reject();
          commit('setRemarks', { ...response.data });
          resolve();
        });
      })
      .catch(reject);
  });
}

export function addRemark({ commit, state }, { remark, remarkType }) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({
      func: 'postRemark',
      data: {
        remark,
        remarkType,
        projectName: state.projectName,
      },
    }, (response) => {
      if (!response.data || response.status !== 201) reject();
      commit('addRemark', {
        remark: response.data,
        remarkType,
      });
      resolve();
    });
  });
}

export function updateRemark({ commit, state }, { remark, remarkType }) {
  return new Promise((resolve, reject) => {
    remark.id = state[remarkType].filter(stateRemark =>
      stateRemark.title === remark.title &&
      stateRemark.topic === remark.topic)[0].id;
    chrome.runtime.sendMessage({
      func: 'patchRemark',
      data: {
        remark,
        remarkType,
      },
    }, (response) => {
      if (!response.data || response.status !== 200) reject();
      commit('updateRemark', {
        remark: response.data,
        remarkType,
      });
      resolve();
    });
  });
}

export function removeRemark({ commit, state }, { remark, remarkType }) {
  return new Promise((resolve, reject) => {
    remark.id = state[remarkType].filter(stateRemark =>
      stateRemark.title === remark.title &&
      stateRemark.topic === remark.topic)[0].id;
    chrome.runtime.sendMessage({
      func: 'deleteRemark',
      data: {
        remark,
        remarkType,
      },
    }, (response) => {
      if (response.status !== 204) reject();
      commit('removeRemark', {
        remark,
        remarkType,
      });
      resolve();
    });
  });
}

export function incrementRemark({ commit, state }, { remark, remarkType }) {
  return new Promise((resolve, reject) => {
    remark.id = state[remarkType].filter(stateRemark =>
      stateRemark.title === remark.title &&
      stateRemark.topic === remark.topic)[0].id;
    chrome.runtime.sendMessage({
      func: 'incrementRemark',
      data: {
        remark,
        remarkType,
      },
    }, (response) => {
      if (response.status !== 200) reject();
      resolve();
    });
  });
}
