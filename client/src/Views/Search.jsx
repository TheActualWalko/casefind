import React from 'react';
import SearchInput from '../Components/SearchInput';
import logo from '../logo-dark.svg';
import thumbsUp from '../thumbs-up.svg';
import thumbsDown from '../thumbs-down.svg';
import './Search.css'
import { results, query, types } from '../State/Search/selectors';
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
      <span>Showing only result for "<em>{query}</em>"</span>
    );
  } else {
    return (
      <span>Showing all <strong>{results.length}</strong> results for "<em>{query}</em>"</span>
    );
  }
}

const renderResult = ({name, year, note, type}, push) => (
  <li className={`note-${type.replace(/ /g, '-')}`}>
    <header>
      <button><img src={thumbsUp} alt='thumbs up'/> 12</button>
      <button><img src={thumbsDown} alt='thumbs down'/> 14</button>
      <span>{type}: E-LawResources</span>
    </header>
    <h5><a href={`/search/${name}`}>{name} [{year}]</a></h5>
    {note.split('\n').map(t => <p>{t}</p>)}
  </li>
);

export default connect(
  createStructuredSelector({results, query, types}),
  { push }
)(({results, query, push})=>(
  <main className='search'>
    <header className='search-header'>
      <img src={logo} className='logo' alt='Casefind' />
      <div className='search-input'><SearchInput /></div>
    </header>
    <aside>
      
    </aside>
    <ul className='results'>
      <lh>{renderHeading(results, query)}</lh>
      {results ? results.map((result) => renderResult(result, push)) : null}
    </ul>
  </main>
));