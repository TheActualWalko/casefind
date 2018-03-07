import * as $ from 'jquery';

export const receiveCase = (caseResult) => ({
  type: 'RECEIVE_CASE',
  payload: caseResult
});

export const setCaseExpanded = (buttonDescription, expanded) => ({
  type: 'SET_CASE_EXPANDED',
  payload: {
    buttonDescription,
    expanded
  }
});

export const selectTab = (source) => ({
  type: 'SELECT_TAB',
  payload: source,
});

export const reportIssue = (caseId, sourceId) => ({
  type: 'REPORT_ISSUE',
  payload: { caseId, sourceId }
});

export const loadFullCase = (id) => (dispatch, getState) => {
  const {apiRoot} = getState();
  $.ajax({
    method: 'GET',
    url: `${apiRoot}/api/case/${id}`,
    success: (result) => dispatch(receiveCase(result))
  })
};