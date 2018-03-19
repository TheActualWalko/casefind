import React, { Component } from 'react';
import './Embed.css';

class Embed extends Component {
  constructor() {
    super();
    this.state = { loading: true };
  }

  componentDidMount() {
    this.iframe.addEventListener(
      'load',
      () => {
        this.props.onLoad && this.props.onLoad();
        this.setState({ loading: false });
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.setState({ loading: true });
    }
  }

  render() {
    return <div className='embed-wrap'>
      <iframe ref={(r) => {this.iframe = r}} src={this.props.src} title={this.props.title} className={`${this.state.loading ? 'loading' : ''}`} />
      <div className='loading-bg'></div>
    </div>
  }
}

export default Embed;