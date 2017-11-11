import * as $ from 'jquery';
import {debounce} from 'lodash';

const runSearchQuery = (dispatch, getState) => {
  const {query, types} = getState().search;
  $.ajax({
    method: 'GET',
    url: `http://localhost:1337/api/search/${query}?types=${JSON.stringify(types)}`,
    success: (results) => dispatch(receiveResults(query, types, results))
  })
};

const runSearchQueryDebounced = debounce(runSearchQuery, 250);

export const changeQuery = (query) => (dispatch, getState) => {
  dispatch({
    type: 'CHANGE_QUERY',
    payload: query
  });
  if (query.length >= 3) {
    runSearchQueryDebounced(dispatch, getState);
  }
};
  
export const toggleType = (type) => (dispatch, getState) => {
  dispatch({
    type: 'TOGGLE_TYPE',
    payload: type
  });
  runSearchQueryDebounced(dispatch, getState);
};

export const receiveResults = (query, types, results) => ({
  type: 'RECEIVE_RESULTS',
  payload: {query, types, results}
});