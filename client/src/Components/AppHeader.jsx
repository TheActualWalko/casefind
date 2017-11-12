import React from 'react';
import SearchInput from '../Components/SearchInput';
import logo from '../logo-dark.svg';
import './AppHeader.css';

export default ({isDummySearch}) => (
  <header className='app-header'>
    <img src={logo} className='logo' alt='Casefind' />
    <div className='search-input'><SearchInput isDummy={isDummySearch} /></div>
  </header>
);