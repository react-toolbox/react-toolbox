import PropTypes from 'prop-types';
import React from 'react';
import style from './style';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';

class Editor extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    codeText: PropTypes.string,
    lineNumbers: PropTypes.bool,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    tabSize: PropTypes.number,
    theme: PropTypes.string
  };

  static defaultProps = {
    className: '',
    lineNumbers: false,
    readOnly: false,
    tabSize: 2,
    theme: 'one-dark'
  };

  componentDidMount () {
    this.editor = CodeMirror.fromTextArea(this.refs.editor, {
      mode: 'javascript',
      lineNumbers: this.props.lineNumbers,
      smartIndent: false,
      tabSize: this.props.tabSize,
      matchBrackets: true,
      theme: this.props.theme,
      readOnly: this.props.readOnly
    });

    this.editor.on('change', this.handleChange);
  }

  componentDidUpdate () {
    if (this.props.readOnly) {
      this.editor.setValue(this.props.codeText);
    }
  }

  handleChange = () => {
    if (!this.props.readOnly && this.props.onChange) {
      this.props.onChange(this.editor.getValue());
    }
  };

  setCode (code) {
    this.editor.getDoc().setValue(code);
    this.handleChange();
  }

  render () {
    let className = style.editor;
    if (this.props.className) className += ` ${this.props.className}`;
    return (
      <div className={className}>
        <textarea ref="editor" defaultValue={this.props.codeText} />
      </div>
    );
  }
}

export default Editor;
