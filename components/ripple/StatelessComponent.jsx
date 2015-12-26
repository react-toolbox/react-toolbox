import React from 'react';

const StatelessComponent = (func) => {
  return class StatelessComponentWrapper extends React.Component {
    render () {
      return func(this.props, this.context, this.updater);
    }
  };
};

export default StatelessComponent;
