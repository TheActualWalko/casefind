import { getResultKey } from './helpers';

export default (state = {
  query: '',
  types: {
    facts: true,
    decision: true,
    other: true
  },
  requests: [],
  results: {}
}, action) => {
  switch (action.type) {
    case 'TOGGLE_TYPE':
      return {
        ...state,
        types: {
          ...state.types,
          [action.payload]: !state.types[action.payload]
        }
      };
    case 'CHANGE_QUERY':
      return {
        ...state,
        query: action.payload.query
      };
    case 'RECEIVE_RESULTS':
      return {
        ...state,
        results: {
          ...state.results,
          [getResultKey(action.payload.query, action.payload.types)]: action.payload.results
        }
      };
    case 'REQUEST_ADD':
      return {
        ...state,
        requests: [
          ...state.requests,
          action.payload
        ]
      };
    default:
      return state;
  }
};