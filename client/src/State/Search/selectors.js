import { createSelector } from 'reselect';
import { notes } from '../Notes/selectors';

export const search = (state) => state.search || {};
export const query = createSelector(
  search,
  ({ query }) => query || ''
);
export const results = createSelector(
  [notes, search],
  (notes, { results = {}, query }) => (results[query] || []).map(id => notes[id])
);