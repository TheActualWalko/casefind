import React from 'react';
import SearchInput from '../Components/SearchInput';
import logo from '../logo-dark.svg';
import './AppHeader.css';

export default ({isDummySearch}) => (
  <header className='app-header'>
    <a href="/search"><img src={logo} className='logo' alt='Casefind' /></a>
    <div className='search-input'><SearchInput isDummy={isDummySearch} /></div>
  </header>
);