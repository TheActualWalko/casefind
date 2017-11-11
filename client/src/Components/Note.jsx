import React from 'react';
import SearchHighlight from './SearchHighlight';
import { note } from '../State/Notes/selectors.js';
import { query } from '../State/Search/selectors.js';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './Note.css';

export default connect(
  createStructuredSelector({ query, note })
)(({ showQuery, expanded, query, note: { id, type, content } }) => (
  <section className={`note ${type}`}>
    <h5>{type}</h5>
    {
      content
        .split('\n')
        .map((text, index) => <p key={index}><SearchHighlight text={text} query={showQuery ? query : ''} /></p>)
    }
  </section>
));