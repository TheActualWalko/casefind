import React = require('react');
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

const Hero = ({push}) => (
  <header className="main-header">
    <h2><a href="/" title="Home" rel="noopener"><img src="img/logo.png" alt="Logo" /></a></h2>
    <h1>
      <a onClick={()=>push('/')}>
        <span>Alumni</span>
        <span>Database</span>
      </a>
    </h1>
  </header>
);

const mapDispatchToProps = {push}

export default connect(null, mapDispatchToProps)(Hero);