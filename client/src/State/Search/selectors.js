import { createSelector } from 'reselect';
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
export const requested = createSelector(
  search,
  ({ query, requests }) => query && requests.map(r => r.toLowerCase().trim()).includes(query.toLowerCase().trim())
);