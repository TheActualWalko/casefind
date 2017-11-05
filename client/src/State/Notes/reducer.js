export default (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_RESULTS':
      return {
        ...state, 
        ...action.payload.results
      };
    default:
      return state;
  }
};