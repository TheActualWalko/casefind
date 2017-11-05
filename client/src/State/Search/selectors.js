import { createSelector } from 'reselect';
import { notes } from '../Notes/selectors';
import { getResultKey } from './helpers';

export const search = (state) => state.search || {};
export const query = createSelector(
  search,
  ({ query }) => query
);
export const types = createSelector(
  search,
  ({ types }) => types
);
export const results = createSelector(
  [notes, search],
  (notes, { results = {}, query, types }) => {
    const resultKey = getResultKey(query, types);
    return !!results[resultKey]
      ? results[resultKey].map(id => notes[id])
      : null
  }
);