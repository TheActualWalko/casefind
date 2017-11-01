import {createSelector} from 'reselect';

export default (selector) => (property: string, def ?: any) => createSelector(
  selector,
  (result) => {
    if (result[property] === undefined) {
      return def;
    } else {
      return result[property];
    }
  }
);