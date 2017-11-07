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
  search,
  ({ results, query, types }) => results[getResultKey(query, types)]
);