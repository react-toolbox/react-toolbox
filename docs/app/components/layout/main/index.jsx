import React from 'react';
import { Button } from 'react-toolbox';
import Appbar from '../../../components/appbar';
import Markdown from '../../../components/markdown';
import Playground from './components/playground';
import MainNavigation from './components/navigation';
import BaseDocs from './modules/components.md';
import components from './modules/components.js';
import style from './style';

class Main extends React.Component {
  state = {
    playground: false
  };

  handlerPlayGroundClick = () => {
    this.setState({ playground: !this.state.playground});
  }

  resolveMarkdownPath () {
    if (this.props.params.component) {
      return components[this.props.params.component].docs;
    } else {
      return BaseDocs;
    }
  }

  render () {
    const docs = this.resolveMarkdownPath();
    let className = style.root;
    if (this.state.playground) {
      className += ` ${style['with-playground']}`;
    }

    return (
      <div className={className}>
        <Appbar className={style.appbar}/>
        <Button
          accent
          className={style['playground-button']}
          icon={this.state.playground ? 'close' : 'code'}
          kind='floating'
          onClick={this.handlerPlayGroundClick}
        />
        <MainNavigation className={style.navigation} />
        <Markdown className={style.documentation} markdown={docs}/>
        <Playground className={style.playground} />
      </div>
    );
  }
}
export default Main;
