export default (state = {
  query: '',
  results: {}
}, action) => {
  switch (action.type) {
    case 'CHANGE_QUERY':
      return {...state, query: action.payload}
    case 'RECEIVE_RESULTS':
      return {
        ...state, 
        results: {
          ...state.results, 
          [action.payload.query]: Object.keys(action.payload.results)
        }
      };
    default:
      return state;
  }
};