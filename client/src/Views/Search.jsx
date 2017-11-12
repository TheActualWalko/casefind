import React from 'react';
import Case from '../Components/Case';
import AppHeader from '../Components/AppHeader';
import './Search.css'
import { results, query, types } from '../State/Search/selectors';
import { toggleType } from '../State/Search/actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';

const renderHeading = (results, query) => {
  if (!results && !query) {
    return null;
  } else if (!results && !!query) {
    return <span>Searching for for "<em>{query}</em>"</span>
  } else if (results.length === 0) {
    return (
      <span>Found no results for "<em>{query}</em>"</span>
    );
  } else if (results.length === 1) {
    return (
      <span>Showing <strong>only</strong> result for "<em>{query}</em>"</span>
    );
  } else if (results.length === 2) {
    return (
      <span>Showing <strong>both</strong> results for "<em>{query}</em>"</span>
    );
  } else {
    return (
      <span>Showing all <strong>{results.length}</strong> results for "<em>{query}</em>"</span>
    );
  }
}
export default connect(
  createStructuredSelector({results, query, types}),
  { push, toggleType }
)(({results, query, types, push, toggleType})=>(
  <main className='search'>
    <AppHeader />
    <aside>
      <h5>Filters</h5>
      <ul className='filters'>
        <li
          className={`facts ${types.facts ? '' : 'disabled'}`}
          onClick={()=>toggleType('facts')}
        >
          Facts
        </li>
        <li
          className={`decision ${types.decision ? '' : 'disabled'}`}
          onClick={()=>toggleType('decision')}
        >
          Decisions
        </li>
        <li
          className={`other ${types.other ? '' : 'disabled'}`}
          onClick={()=>toggleType('other')}
        >
          Other
        </li>
      </ul>
    </aside>
    <ul className='results'>
      <li className='list-heading'>{renderHeading(results, query)}</li>
      {
        results 
        ? results.map((result) => <li key={result.id}><Case showQuery id={result.id} /></li>)
        : null
      }
    </ul>
  </main>
));