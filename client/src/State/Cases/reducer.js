export default (state = {}, action) => {
  const casesById = {};
  switch (action.type) {
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