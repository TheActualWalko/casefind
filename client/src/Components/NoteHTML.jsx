import React from 'react';
import './NoteHTML.css';

export default ({text, query, asParagraphs}) => {
  const firstQueryStart = text.toLowerCase().indexOf(query.toLowerCase());
  if (query === '' || firstQueryStart === -1) {
    const content = <span dangerouslySetInnerHTML={{__html: text.replace(/<p><br><\/p>/g, '')}} />;
    return asParagraphs ? <p>{content}</p> : content;
  } else {
    const lines = text.split(/<[^>]*>/).filter(x => x.length > query.length);
    const outputLines = lines.map((line => {
      const queryStart = line.toLowerCase().indexOf(query.toLowerCase());
      if (queryStart < 0) {
        return line;
      }
      return [
        line.slice(0, queryStart),
        <span key='highlight' className='search-highlight'>{line.slice(queryStart, queryStart + query.length)}</span>,
        line.slice(queryStart + query.length)
      ];
    }));
    if (asParagraphs) {
      return outputLines.map((l, i) => <p key={i}>{l}</p>);
    } else {
      return outputLines;
    }
  }
}