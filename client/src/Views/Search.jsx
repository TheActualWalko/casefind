import React from 'react';
import Case from '../Components/Case';
import AppHeader from '../Components/AppHeader';
import './Search.css'
import welcomeScreen from '../welcome-screen.svg';
import { results, query, types } from '../State/Search/selectors';
import { toggleType } from '../State/Search/actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';

const renderHeading = (results, query) => {
  if (!results && !query) {
    return null;
  } else if (!results && !!query) {
    return <span>Searching for "<em>{query}</em>"</span>
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

const WelcomeMessage = () => (
  <div className='welcome-message'>
    <img src={welcomeScreen} />
    <h4>Welcome back!</h4>
    <h5>Enter a case name in the search bar above.</h5>
  </div>
);

export default connect(
  createStructuredSelector({results, query, types}),
  { push, toggleType }
)(({results, query, types, push, toggleType})=>(
  <main className='search'>
    <AppHeader />
    <ul className='results'>
      <li className='list-heading'>{renderHeading(results, query)}</li>
      {
        results
        ? results.map((result) => <li key={result.id}><Case showQuery id={result.id} /></li>)
        : null
      }
    </ul>
    {!query ? <WelcomeMessage /> : null}
  </main>
));