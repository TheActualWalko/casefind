import {createStore, applyMiddleware, combineReducers} from 'redux';
import {routerReducer as routing, routerMiddleware} from 'react-router-redux';
import analytics from './Middleware/Analytics';
import reduxThunk from './Middleware/Thunk';

import search from './Search/reducer';
import cases from './Cases/reducer';

export default (history, apiRoot) => {
  const reducer = combineReducers({
    routing,
    search,
    cases,
    apiRoot: () => apiRoot
  });

  return applyMiddleware(
    reduxThunk,
    routerMiddleware(history),
    analytics
  )(createStore)(
    reducer,
    undefined,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};