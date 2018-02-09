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
