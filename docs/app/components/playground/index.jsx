import React from 'react';
import Editor from '../editor';
import Preview from '../preview';
import style from './style';

class Playground extends React.Component {
  static propTypes = {
    codeText: React.PropTypes.string.isRequired,
    layout: React.PropTypes.oneOf(['vertical', 'horizontal'])
  };

  static defaultProps = {
    layout: 'horizontal'
  };

  state = {
    code: this.props.codeText
  };

  handleCodeChange = (code) => {
    this.setState({code});
  };

  render () {
    const className = `${style.playground} ${style[this.props.layout]}`;
    return (
      <div className={className}>
        <Editor
          className={style.editor}
          codeText={this.state.code}
          onChange={this.handleCodeChange}
        />
        <Preview
          className={style.preview}
          code={this.state.code}
        />
      </div>
    );
  }
}

export default Playground;
