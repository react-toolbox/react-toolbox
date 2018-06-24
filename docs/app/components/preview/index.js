/*eslint-disable no-eval*/
import PropTypes from 'prop-types';

import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'react-css-themr';
import { transform } from 'babel-standalone';
import * as ReactToolbox from 'react-toolbox';
import theme from '../../theme/theme.js';
import style from './style';

const ERROR_TIMEOUT = 500;

const Preview = React.createClass({
  propTypes: {
    className: PropTypes.string,
    code: PropTypes.string.isRequired,
    scope: PropTypes.object
  },

  getDefaultProps () {
    return {
      className: '',
      scope: { React, ...ReactToolbox }
    };
  },

  getInitialState () {
    return {
      error: null
    };
  },

  componentDidMount () {
    this.executeCode();
  },

  componentDidUpdate (prevProps) {
    clearTimeout(this.timeoutID);
    if (this.props.code !== prevProps.code) {
      this.executeCode();
    }
  },

  setTimeout () {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(...arguments);
  },

  compileCode () {
    const code = `
      (function (${Object.keys(this.props.scope).join(', ')}, mountNode) {
        ${this.props.code}
      });`;

    return transform(code, {
      presets: ['es2015', 'stage-0', 'react']
    }).code;
  },

  buildScope (mountNode) {
    return Object.keys(this.props.scope).map((key) => {
      return this.props.scope[key];
    }).concat(mountNode);
  },

  executeCode () {
    const mountNode = this.refs.mount;
    const scope = this.buildScope(mountNode);

    try {
      ReactDOM.unmountComponentAtNode(mountNode);
    } catch (e) {
      console.error(e);
    }

    try {
      ReactDOM.render(
        <ThemeProvider theme={theme}>
          {eval(this.compileCode())(...scope)}
        </ThemeProvider>
      , mountNode);
      if (this.state.error) {
        this.setState({error: null});
      }
    } catch (err) {
      this.setTimeout(() => {
        this.setState({error: err.toString()});
      }, ERROR_TIMEOUT);
    }
  },

  render () {
    let className = style.preview;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div className={className}>
        {this.state.error !== null ? <span className={style.error}>{this.state.error}</span> : null}
        <div ref="mount" className={style.content} />
      </div>
    );
  }
});

export default Preview;
