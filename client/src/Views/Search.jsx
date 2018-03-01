import React from 'react';
import Case from '../Components/Case';
import AppHeader from '../Components/AppHeader';
import './Search.css'
import welcomeScreen from '../welcome-screen.svg';
import { results, query, types, requested } from '../State/Search/selectors';
import { toggleType, requestAdd } from '../State/Search/actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';

const renderHeading = (results, query, requested, requestAdd) => {
  const requestLine = <div><a className='request-add-link' onClick={() => requestAdd(query)}>Click here</a> if you believe "<em>{query}</em>" should be added to the database.</div>;
  const requestedLine = <div><em>Thank you!</em> Your request to add "<em>{query}</em>" to the database has been received.</div>;
  if (!results && !query) {
    return null;
  } else if (!results && !!query) {
    return <span>Searching for "<em>{query}</em>"</span>
  } else if (results.length === 0) {
    return (
      [
        <div key={1}><span>Found no results for "<em>{query}</em>"</span></div>,
        requested ? requestedLine : requestLine
      ]
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
  createStructuredSelector({results, query, types, requested}),
  { push, toggleType, requestAdd }
)(({results, query, types, push, toggleType, requested, requestAdd})=>(
  <main className='search'>
    <AppHeader />
    <ul className='results'>
      <li className='list-heading'>{renderHeading(results, query, requested, requestAdd)}</li>
      {
        results
        ? results.map((result) => <li key={result.id}><Case showQuery id={result.id} /></li>)
        : null
      }
    </ul>
    {!query ? <WelcomeMessage /> : null}
  </main>
));