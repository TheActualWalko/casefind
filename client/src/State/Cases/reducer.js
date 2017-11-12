import { mapCaseResult } from './helpers';

export default (state = {}, action) => {
  const casesById = {};
  switch (action.type) {
    case 'RECEIVE_RESULTS':
      action.payload.results
        .map(mapCaseResult)
        .forEach((caseResult) => casesById[caseResult.id] = caseResult);
      return {
        ...state,
        ...casesById
      };
    case 'RECEIVE_CASE':
      const caseNormalized = {
        ...action.payload,
        notes: action.payload.notes.map(n => n.id),
        fullContentLoaded: true
      };
      return {
        ...state,
        [caseNormalized.id]: caseNormalized
      }
    default:
      return state;
  }
};