export function setSubmissionInfo(state, { generalComment, price, projectName, submissionId }) {
  state.generalComment = generalComment;
  state.price = price;
  state.projectName = projectName;
  state.submissionId = submissionId;
}

export function setSubmissionCritiques(state, { submissionCritiques }) {
  state.submissionCritiques = submissionCritiques.sort((a, b) =>
    a.rubric_item.section.position - b.rubric_item.section.position ||
    a.rubric_item.position - b.rubric_item.position);
}

export function setRemarks(state, { comments, critiques, generalComments }) {
  state.comments = comments;
  state.critiques = critiques;
  state.generalComments = generalComments;
}

export function addRemark(state, { remark, remarkType }) {
  state[remarkType].push(remark);
}

export function updateRemark(state, { remark, remarkType }) {
  state[remarkType].forEach((stateRemark) => {
    if (stateRemark.title === remark.title &&
        stateRemark.topic === remark.topic) {
      stateRemark.body = remark.body;
      stateRemark.category = remark.category;
    }
  });
}

export function removeRemark(state, { remark, remarkType }) {
  state[remarkType] = state[remarkType].filter(stateRemark =>
    stateRemark.body !== remark.body);
}
