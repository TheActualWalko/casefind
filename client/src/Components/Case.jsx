import React, { Component } from 'react';
import NoteHTML from './NoteHTML';
import Embed from './Embed';
import { query } from '../State/Search/selectors';
import { caseSelector } from '../State/Cases/selectors';
import { loadFullCase, setCaseExpanded, selectTab, reportIssue } from '../State/Cases/actions';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import './Case.css';

export default connect(
  createStructuredSelector({ selectedCase: caseSelector, query }),
  { push, loadFullCase, setCaseExpanded, selectTab, reportIssue }
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
  toggleExpanded(expandButtonDescription) {
    const {expanded} = this.state;
    const {fullContentLoaded, loadFullCase, id, setCaseExpanded} = this.props;
    this.setState({ expanded: !expanded })
    setCaseExpanded(expandButtonDescription, !expanded)
    if (!expanded && !fullContentLoaded) {
      loadFullCase(id);
    }
  }
  showEmbed(index) {
    this.setState({
      activeEmbed: index
    });
    try {
      this.props.selectTab(this.props.selectedCase.embeds[index].source);
    } catch(e) {

    }
  }
  showNotes() {
    this.setState({
      activeEmbed: false
    });
    this.props.selectTab('notes');
  }
  render() {
    const {selectedCase, query, showQuery, push, forceExpanded, reportIssue} = this.props;
    const {expanded, activeEmbed} = this.state;
    if (!selectedCase) {
      return null;
    }
    const {id, name, year, content, preview, embeds, issuesReported} = selectedCase;
    const text = (expanded || forceExpanded ? (content || preview) : preview);
    const sourceId = embeds[activeEmbed] ? embeds[activeEmbed].id : null;
    return (
      <article className='case'>
        <header>
          <span className={`tab ${activeEmbed === false ? 'active' : ''}`} onClick={() => this.showNotes()}>Casefind</span>
          {embeds.map((e, i) => <span key={e.embed} className={`tab ${activeEmbed === i ? 'active' : ''}`} onClick={() => this.showEmbed(i)}>{e.source}</span>)}
          {forceExpanded
            ? null
            : <button
              className='expand-button'
              onClick={() => this.toggleExpanded('header expand button')}>
                {expanded ? '-' : '+'}
              </button>
          }
        </header>
        <div className='interactions'>
          {
            issuesReported && issuesReported[sourceId]
              ? <span>Issue reported!</span>
              : <button onClick={() => reportIssue(id, sourceId)}>See a problem?</button>
          }
        </div>
        <h4>
          <a onClick={(e) => {
            e.stopPropagation();
            push(`/case/${id}`);
          }}>
            <NoteHTML text={`${name} [${String(year)}]`} query={showQuery ? query : ''} />
          </a>
        </h4>
        {
          activeEmbed === false
            ? <section><NoteHTML asParagraphs text={text} query={showQuery ? query : ''} /></section>
            : <Embed title={embeds[activeEmbed].source} src={embeds[activeEmbed].embed} />
        }
        {
          activeEmbed === false && !forceExpanded
            ? <footer
              key='footer'
              className='expand-prompt'
              onClick={() => this.toggleExpanded('full case notes text')}>
                {expanded ? '- Minimize' : '+ Show full case notes'}
            </footer>
            : null
        }
      </article>
    );
  }
});