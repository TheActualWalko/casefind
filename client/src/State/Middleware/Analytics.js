import * as $ from 'jquery';
import {LOCATION_CHANGE} from 'react-router-redux';
import {debounce} from 'lodash';

const track = (apiRoot, action, data) => {
  if (typeof window !== 'undefined') {
    $.post(
      `${apiRoot}/api/track`,
      { action, data }
    );
  }
}

const trackLoad = (apiRoot, pathname) => {
  track(apiRoot, 'load', pathname);
}

const trackTyping = debounce((apiRoot, query) => {
  track(apiRoot, 'typing', query);
}, 500);

const trackSetCaseExpanded = (apiRoot, buttonDescription, expanded) => {
  if (expanded) {
    track(apiRoot, 'expandCase', buttonDescription);
  } else {
    track(apiRoot, 'minimizeCase', buttonDescription);
  }
}

const trackSelectTab = (apiRoot, tabSource) => {
  track(apiRoot, 'selectTab', tabSource);
}

const trackRequestAdd = (apiRoot, query) => {
  track(apiRoot, 'requestAdd', query);
}

let lastQuery = '';

const middleware = ({dispatch, getState}) => (next) => (action) => {
  const {apiRoot} = getState();
  switch (action.type) {
    case LOCATION_CHANGE:
      trackLoad(apiRoot, action.payload.pathname);
      break;
    case 'CHANGE_QUERY':
      if (action.payload.isTyping && action.query !== '' && action.query !== lastQuery) {
        lastQuery = action.payload.query;
        trackTyping(apiRoot, action.payload.query);
      }
      break;
    case 'SET_CASE_EXPANDED':
      trackSetCaseExpanded(apiRoot, action.payload.buttonDescription, action.payload.expanded);
      break;
    case 'SELECT_TAB':
      trackSelectTab(apiRoot, action.payload);
      break;
    case 'REQUEST_ADD':
      trackRequestAdd(apiRoot, action.payload);
      break;
    default:
      break;
  }
  next(action);
}

export default middleware;