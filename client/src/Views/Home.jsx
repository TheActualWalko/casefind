import React from 'react';
import logo from '../logo.svg';
import './Home.css'
import {Link} from 'react-router-dom';
import SearchInput from '../Components/SearchInput';

export default ()=>(
  <main>
    <section className='hero'>
      <header>
        <img src={logo} className='logo' alt='Casefind' />
        <nav>
          <Link to='/contact-us'>Contact Us</Link>
        </nav>
      </header>
      <h2>No one has time to read full-length judgements</h2>
      <h3>Find out what you need to know about</h3>
      <div className='search-input'><SearchInput isDummy /></div>
    </section>
    <section className='students'>
      
    </section>
    <section className='science'>
      
    </section>
  </main>  
);