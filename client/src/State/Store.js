import {createStore, applyMiddleware, combineReducers} from 'redux';
import {routerReducer as routing, routerMiddleware} from 'react-router-redux';
import analytics from './Middleware/Analytics';
import reduxThunk from './Middleware/Thunk';

import search from './Search/reducer';
import notes from './Notes/reducer';

export default (history) => {
  const reducer = combineReducers({
    routing,
    search,
    notes
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