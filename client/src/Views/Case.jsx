import React, { Component } from 'react';
import AppHeader from '../Components/AppHeader';
import Case from '../Components/Case';
import './Case.css'
import { loadFullCase } from '../State/Cases/actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const getRouteCaseId = (state) => state.routing.location.pathname.replace('/case/', '');
const getFullContentLoaded = (state) => {
  const id = getRouteCaseId(state);
  return state.cases[id] && state.cases[id].fullContentLoaded;
}

export default connect(
  createStructuredSelector({ 
    id: getRouteCaseId,
    caseDisplayable: getFullContentLoaded
  }),
  { loadFullCase }
)(class CaseView extends Component {
  componentDidMount() {
    const { caseDisplayable, loadFullCase, id } = this.props;
    
    if (!caseDisplayable) {
      loadFullCase(id);
    }
  }
  render() {
    const { id, caseDisplayable } = this.props;
    return (
      <main className='case-view'>
        <AppHeader isDummySearch />
        {caseDisplayable ? <Case id={id} forceExpanded /> : null}
      </main>
    );
  }
});