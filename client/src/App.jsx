import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import store from './State/Store';
import Home from './Views/Home';
import Search from './Views/Search';
import ContactUs from './Views/ContactUs';
import { changeQuery } from './State/Search/actions';

const getQuery = (url) => url.includes('/search/')
  ? decodeURIComponent(url.split('/search/')[1].split('?')[0])
  : '';

class App extends Component {
  store = null
  componentWillMount() {
    this.store = store(this.props.history);
  }
  componentDidMount() {
    const initialQuery = getQuery(window.location.href);
    if (initialQuery) {
      this.store.dispatch(changeQuery(initialQuery));
    }
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
