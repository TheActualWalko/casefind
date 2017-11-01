import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import store from './State/Store';
import Home from './Views/Home';
import Search from './Views/Search';
import ContactUs from './Views/ContactUs';

class App extends Component {
  store = null
  componentWillMount() {
    this.store = store(this.props.history);
  }
  render() {
    return (
      <Provider store={this.store}>
        <ConnectedRouter history={this.props.history}>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/search/:query" component={Search} />
            <Route exact path="/contact-us" component={ContactUs} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
