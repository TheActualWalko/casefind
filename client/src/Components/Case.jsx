import React, { Component } from 'react';
import Note from '../Components/Note';
import SearchHighlight from './SearchHighlight';
import { query } from '../State/Search/selectors';
import { caseSelector } from '../State/Cases/selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './Case.css';

export default connect(
  createStructuredSelector({ selectedCase: caseSelector, query })
)(class Case extends Component {
  state = {};
  getInitialState() {
    return {
      expanded: this.props.forceExpanded
    };
  }
  render() {
    const {selectedCase, query, showQuery} = this.props;
    const {id, name, year, notes} = selectedCase;
    const {expanded} = this.state;
    return (
      <article className='case'>
        <h4>
          <a href={`/case/${id}`}>
            <SearchHighlight text={name} query={showQuery ? query : ''} /> [<SearchHighlight text={String(year)} query={showQuery ? query : ''} />]
          </a>
        </h4>
        {notes.map((noteId) => <div key={noteId}><Note id={noteId} expanded={expanded} showQuery={showQuery} /></div>)}
      </article>
    );
  }
});