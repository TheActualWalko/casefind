import * as $ from 'jquery';

export const receiveCase = (caseResult) => ({
  type: 'RECEIVE_CASE',
  payload: caseResult
});

export const loadFullCase = (id) => (dispatch, getState) => {
  const {apiRoot} = getState();
  $.ajax({
    method: 'GET',
    url: `${apiRoot}/api/case/${id}`,
    success: (result) => dispatch(receiveCase(result))
  })
};