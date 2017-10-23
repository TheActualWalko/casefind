import reduxThunk from './redux-thunk';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {routerReducer as routing, routerMiddleware} from 'react-router-redux';
import analytics from './analytics';

export default (statics, history) => {
  const reducer = combineReducers({
    routing,
    statics: (state, action) => statics
  });

  return applyMiddleware(reduxThunk, routerMiddleware(history), analytics)(createStore)(reducer, undefined);
};