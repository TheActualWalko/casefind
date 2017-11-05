import * as $ from 'jquery';
import {debounce} from 'lodash';

export const changeQuery = (query) => ((dispatch, getState) => {
  dispatch({
    type: 'CHANGE_QUERY',
    payload: query
  });
  if (query.length >= 3) {
    debounce(() => $.ajax({
      method: 'GET',
      url: `/api/search/${query}`,
      success: (results) => dispatch(receiveResults(query, results))
    }), 250)();
  }
});

export const receiveResults = (query, results) => ({
  type: 'RECEIVE_RESULTS',
  payload: {query, results}
});