import React from 'react';
import './SearchInput.css';
import gavel from '../gavel.svg';
import { createStructuredSelector } from 'reselect';
import { changeQuery } from '../State/Search/actions';
import { push } from 'react-router-redux';
import { query } from '../State/Search/selectors';
import { connect } from 'react-redux';

export default connect(
  createStructuredSelector({ query }),
  { changeQuery, push }
)(
  class SearchInput extends React.Component {
    componentDidMount() {
      if (!this.props.isDummy) this.input.setSelectionRange(this.props.query.length, this.props.query.length)
    }
    render() {
      const { isDummy, query, changeQuery, push } = this.props;
      return (
        <div className='SearchInput'>
          <input
            val={query}
            value={query}
            ref={(el) => this.input = el}
            onKeyDown={(e)=>{
              if (isDummy && !e.ctrlKey && !e.altKey && !e.metaKey && e.keyCode >= 48 && e.keyCode <= 90) {
                setTimeout(()=>push(`/search`));
              }
            }}
            onChange={(e) => changeQuery(e.target.value)} 
            autoFocus={!isDummy}
          />
          <button onClick={(e) => push(`/search/${query}`)}><img src={gavel} alt='Go!'/></button>
        </div>
      );
    }
  }
);