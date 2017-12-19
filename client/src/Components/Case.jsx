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

const Notes = ({notes, forceExpanded, expanded, showQuery, toggleExpanded}) => {
  return [
    ...notes.map((noteId) => <div key={noteId}><Note id={noteId} expanded={forceExpanded || expanded} showQuery={showQuery} /></div>),
    forceExpanded
      ? null
      : <footer
        className='expand-prompt'
        onClick={toggleExpanded}>
          {expanded ? '- Minimize' : '+ Show full case notes'}
        </footer>
  ];
};

const Embed = ({src}) => <iframe src={src} />;

export default connect(
  createStructuredSelector({ selectedCase: caseSelector, query }),
  { push, loadFullCase }
)(class Case extends Component {
  state = {
    expanded: false,
    activeEmbed: false
  }
  getInitialState() {
    return {
      expanded: this.props.forceExpanded,
      activeEmbed: false
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
  showEmbed(index) {
    this.setState({
      activeEmbed: index
    });
  }
  showNotes() {
    this.setState({
      activeEmbed: false
    });
  }
  render() {
    const {selectedCase, query, showQuery, push, forceExpanded, loadFullCase} = this.props;
    const {expanded, activeEmbed} = this.state;
    if (!selectedCase) {
      return null;
    }
    const {id, name, year, notes, fullContentLoaded, embeds} = selectedCase;
    return (
      <article className='case'>
        <header>
          <span className={`tab ${activeEmbed === false ? 'active' : ''}`} onClick={() => this.showNotes()}>Notes</span>
          {embeds.map((e, i) => <span key={e.embed} className={`tab ${activeEmbed === i ? 'active' : ''}`} onClick={() => this.showEmbed(i)}>{e.source}</span>)}
          {forceExpanded
            ? null
            : <button
              className='expand-button'
              onClick={() => this.toggleExpanded()}>
                {expanded ? '-' : '+'}
              </button>
          }
        </header>
        <h4>
          <a onClick={(e) => {
            e.stopPropagation();
            push(`/case/${id}`)
          }}>
            <SearchHighlight text={name} query={showQuery ? query : ''} /> [<SearchHighlight text={String(year)} query={showQuery ? query : ''} />]
          </a>
        </h4>
        {
          activeEmbed === false
            ? <Notes notes={notes} forceExpanded={forceExpanded} expanded={expanded} showQuery={showQuery} toggleExpanded={() => this.toggleExpanded()} />
            : <Embed src={embeds[activeEmbed].embed} />
        }
      </article>
    );
  }
});