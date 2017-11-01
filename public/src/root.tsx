import * as React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import store from './state/store';
import Home from './views/home';

export default class App extends React.Component<{statics: any, history: any},{}>{
  store = null
  componentWillMount() {
    this.store = store(this.props.statics, this.props.history);
  }
  render() {
    return (
      <Provider store={this.store}>
        <ConnectedRouter history={this.props.history}>
          <div>
            <Route exact path="/" component={Home} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
