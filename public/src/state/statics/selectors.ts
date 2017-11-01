import subselect from '../../helpers/subselect';
import {createSelector, createStructuredSelector} from 'reselect';

export const statics = (state) => state.statics;

const createStaticsSelector = subselect(statics);

export const placeholder = createStaticsSelector('placeholder', 'Oh no placeholder default');