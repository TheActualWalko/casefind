import React from 'react';
import SearchInput from '../Components/SearchInput';
import logo from '../logo-dark.svg';
import thumbsUp from '../thumbs-up.svg';
import thumbsDown from '../thumbs-down.svg';
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

const renderNote = (note, query) => (
  <article className={`note-${note.type}`}>
    <h5>{note.type}</h5>
    {
      note.content
        .split('\n')
        .map(t => {
          const queryStart = t.toLowerCase().indexOf(query.toLowerCase());
          if (queryStart === -1) {
            return <p>{t}</p>;
          } else {
            return (
              <p>
                {t.slice(0, queryStart)}
                <span className='search-highlight'>{t.slice(queryStart, queryStart + query.length)}</span>
                {t.slice(queryStart + query.length)}
              </p>
            )
          }
        })
    }
  </article>
);

const renderResult = (result, query, push) => (
  <li>
    <h4><a href={`/search/${result.name}`}>{result.name} [{result.year}]</a></h4>
    {result.notes.map((note) => renderNote(note, query))}
  </li>
);

export default connect(
  createStructuredSelector({results, query, types}),
  { push, toggleType }
)(({results, query, types, push, toggleType})=>(
  <main className='search'>
    <header className='search-header'>
      <img src={logo} className='logo' alt='Casefind' />
      <div className='search-input'><SearchInput /></div>
    </header>
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
      <lh>{renderHeading(results, query)}</lh>
      {results ? results.map((result) => renderResult(result, query, push)) : null}
    </ul>
  </main>
));