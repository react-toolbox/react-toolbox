import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-toolbox';
import Appbar from '../../../components/appbar';
import Markdown from '../../../components/markdown';
import Playground from './components/playground.js';
import MainNavigation from './components/navigation.js';
import BaseDocs from './modules/components.md';
import components from './modules/components.js';
import buttonTheme from './button-theme.scss';
import style from './style';

const LoadExampleButton = (props) => (
  <Button
    accent
    icon='code'
    label="Load in playground"
    theme={buttonTheme}
    onClick={props.onClick}
    raised
  />
);

LoadExampleButton.propTypes = {
  onClick: PropTypes.func
};

class Main extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    params: PropTypes.object
  };

  state = {
    playground: false
  };

  componentDidMount () {
    this.renderExampleLoaders();
  }

  componentDidUpdate () {
    this.renderExampleLoaders();
  }

  LOAD_EXAMPLE_CLASS = 'js-load-in-playground playground-button';

  handlePlayGroundClick = () => {
    this.setState({ playground: !this.state.playground});
  };

  handlePlaygroundLoad = (code) => {
    this.refs.playground.loadCode(code);
    this.setState({playground: true});
  };

  renderExampleLoaders () {
    const examples = document.getElementsByClassName(this.LOAD_EXAMPLE_CLASS);
    Array.prototype.forEach.call(examples, (exampleNode, idx) => {
      const exampleCode = components[this.props.params.component].examples[idx];
      ReactDOM.render(
        <LoadExampleButton onClick={this.handlePlaygroundLoad.bind(this, exampleCode)} />,
        exampleNode
      );
    });
  }

  resolveMarkdown () {
    const PLACEHOLDER = /<!-- example -->/g;
    const NODE = `<span class='${style['load-button']} ${this.LOAD_EXAMPLE_CLASS}'></span>`;
    if (this.props.params.component) {
      return components[this.props.params.component].docs.replace(PLACEHOLDER, NODE);
    } else {
      return BaseDocs;
    }
  }

  render () {
    let className = style.root;
    const docs = this.resolveMarkdown();
    if (this.state.playground) className += ` ${style['with-playground']}`;

    return (
      <div className={className}>
        <Appbar className={style.appbar}/>
        <Button
          accent
          floating
          className={style['playground-button']}
          icon={this.state.playground ? 'close' : 'code'}
          onClick={this.handlePlayGroundClick}
        />
        <MainNavigation className={style.navigation} />
        <Markdown className={style.documentation} markdown={docs}/>
        <Playground ref='playground' className={style.playground} />
      </div>
    );
  }
}
export default Main;
