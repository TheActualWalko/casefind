let reduxThunk = ({dispatch, getState}) => {
  return (next) => (action) => typeof action === 'function' ? action(dispatch, getState) : next(action);
};
export default reduxThunk
