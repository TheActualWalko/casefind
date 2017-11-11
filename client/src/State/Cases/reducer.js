import { mapCaseResult } from './helpers';

export default (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_RESULTS':
      const casesById = {};
      action.payload.results
        .map(mapCaseResult)
        .forEach((caseResult) => casesById[caseResult.id] = caseResult);
      return {
        ...state,
        ...casesById
      };
    default:
      return state;
  }
};