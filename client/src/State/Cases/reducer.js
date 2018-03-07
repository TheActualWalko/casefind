export default (state = {}, action) => {
  const casesById = {};
  switch (action.type) {
    case 'REPORT_ISSUE':
      const lastIssuesReported =  state[action.payload.caseId].issuesReported || {};
      return {
        ...state,
        [action.payload.caseId]: {
          ...state[action.payload.caseId],
          issuesReported: {
            ...lastIssuesReported,
            [action.payload.sourceId]: true
          }
        }
      };
    case 'RECEIVE_RESULTS':
      action.payload.results
        .forEach((caseResult) => casesById[caseResult.id] = caseResult);
      return {
        ...state,
        ...casesById
      };
    case 'RECEIVE_CASE':
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,
          fullContentLoaded: true
        }
      };
    default:
      return state;
  }
};