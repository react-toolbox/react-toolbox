/* eslint-disable no-eval*/
import React from 'react';
import ReactDOM from 'react-dom';
import { transform } from 'babel-standalone';
import * as ReactToolbox from 'react-toolbox';
import style from './style.css';

const ERROR_TIMEOUT = 500;

const Preview = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    code: React.PropTypes.string.isRequired,
    scope: React.PropTypes.object
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
    return Object.keys(this.props.scope).map(key => this.props.scope[key]).concat(mountNode);
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
      ReactDOM.render(eval(this.compileCode())(...scope), mountNode);
      if (this.state.error) {
        this.setState({ error: null });
      }
    } catch (err) {
      this.setTimeout(() => {
        this.setState({ error: err.toString() });
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
