import React from 'react';
import SearchInput from '../Components/SearchInput';
import logo from '../logo-dark.svg';
import thumbsUp from '../thumbs-up.svg';
import thumbsDown from '../thumbs-down.svg';
import './Search.css'
import { results, query } from '../State/Search/selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const renderHeading = (numResults, query) => {
  if (numResults === 0) {
    return (
      <span>Found no results for "<em>{query}</em>"</span>
    );
  } else if (numResults === 1) {
    return (
      <span>Showing only result for "<em>{query}</em>"</span>
    );
  } else {
    return (
      <span>Showing all <strong>{numResults}</strong> results for "<em>{query}</em>"</span>
    );
  }
}

const renderResult = ({name, year, note, type}) => (
  <li className={`note-${type.replace(/ /g, '-')}`}>
    <header>
      <button><img src={thumbsUp} alt='thumbs up'/> 12</button>
      <button><img src={thumbsDown} alt='thumbs down'/> 14</button>
      <span>{type}: E-LawResources</span>
    </header>
    <h5>{name} [{year}]</h5>
    {note.split('\n').map(t => <p>{t}</p>)}
  </li>
);

export default connect(
  createStructuredSelector({results, query})
)(({results, query})=>(
  <main className='search'>
    <header className='search-header'>
      <img src={logo} className='logo' alt='Casefind' />
      <div className='search-input'><SearchInput /></div>
    </header>
    <aside>
      
    </aside>
    <ul className='results'>
      <lh>{renderHeading(results.length, query)}</lh>
      {results.map(renderResult)}
    </ul>
  </main>
));