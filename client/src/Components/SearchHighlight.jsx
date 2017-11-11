import React from 'react';
import './SearchHighlight.css';

export default ({text, query}) => {
  const queryStart = text.toLowerCase().indexOf(query.toLowerCase());
  if (query === '' || queryStart === -1) {
    return text;
  } else {
    return [
      text.slice(0, queryStart),
      <span className='search-highlight'>{text.slice(queryStart, queryStart + query.length)}</span>,
      text.slice(queryStart + query.length)
    ]
  }
}