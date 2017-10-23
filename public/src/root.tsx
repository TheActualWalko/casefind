import React = require('react');
import { Provider } from 'react-redux';
import store from './store';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import Home from './home';

const wrapper = ({children}) => <div>{children}</div>;

export default class App extends React.Component<{statics: any, history: any},{}>{
  store = null
  componentWillMount() {
    this.store = store(this.props.statics, this.props.history);
  }
  render() {
    // for some reason these components aren't typechecking properly
    return (
      <Provider store={this.store}>
        <ConnectedRouter history={this.props.history}>
          <main>
            <Route exact path="/" component={Home} />
          </main>
        </ConnectedRouter>
      </Provider>
    );
  }
}
