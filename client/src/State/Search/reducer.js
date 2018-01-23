import { getResultKey } from './helpers';

export default (state = {
  query: '',
  types: {
    facts: true,
    decision: true,
    other: true
  },
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
    default:
      return state;
  }
};