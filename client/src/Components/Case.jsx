import React, { Component } from 'react';
import Note from '../Components/Note';
import SearchHighlight from './SearchHighlight';
import { query } from '../State/Search/selectors';
import { caseSelector } from '../State/Cases/selectors';
import { loadFullCase } from '../State/Cases/actions';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import './Case.css';

export default connect(
  createStructuredSelector({ selectedCase: caseSelector, query }),
  { push, loadFullCase }
)(class Case extends Component {
  state = {
    expanded: false
  }
  getInitialState() {
    return {
      expanded: this.props.forceExpanded
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.forceExpanded) {
      this.setState({ expanded: true });
    }
  }
  toggleExpanded() {
    const {expanded} = this.state;
    const {fullContentLoaded, loadFullCase, id} = this.props;
    this.setState({ expanded: !expanded })
    if (!expanded && !fullContentLoaded) {
      loadFullCase(id);
    }
  }
  render() {
    const {selectedCase, query, showQuery, push, forceExpanded, loadFullCase} = this.props;
    const {expanded} = this.state;
    if (!selectedCase) {
      return null;
    }
    const {id, name, year, notes, fullContentLoaded} = selectedCase;
    return (
      <article className='case'>
        {forceExpanded 
          ? null 
          : <button 
            className='expand-button'
            onClick={() => this.toggleExpanded()}>
              {expanded ? '-' : '+'}
            </button>
        }
        <h4>
          <a onClick={(e) => {
            e.stopPropagation();
            push(`/case/${id}`)
          }}>
            <SearchHighlight text={name} query={showQuery ? query : ''} /> [<SearchHighlight text={String(year)} query={showQuery ? query : ''} />]
          </a>
        </h4>
        {notes.map((noteId) => <div key={noteId}><Note id={noteId} expanded={expanded || forceExpanded} showQuery={showQuery} /></div>)}
        { forceExpanded 
          ? null 
          : <footer 
            className='expand-prompt'
            onClick={() => this.toggleExpanded()}>
              {expanded ? '- Minimize' : '+ Show full case notes'}
            </footer>
        }
      </article>
    );
  }
});