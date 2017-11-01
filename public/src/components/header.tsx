import * as React from 'react';
import SearchInput from './search-input';
import Logo from './logo';

export default ({ onDark, withNav })=>(
  <header>
    <Logo onDark={onDark} />
    {withNav ? <nav>Contact Us</nav> : <SearchInput />}
  </header>
);