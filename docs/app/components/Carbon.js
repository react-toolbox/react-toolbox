import React, { Component, PropTypes } from 'react';

class Carbon extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  componentDidMount () {
    const script = document.createElement('script');
    script.src = '//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=reacttoolboxcom';
    script.async = true;
    script.id = '_carbonads_js';
    this.carbonNode.appendChild(script);
  }

  render () {
    return (
      <div
        className={this.props.className}
        ref={node => { this.carbonNode = node; }}
      />
    );
  }
}

export default Carbon;
