import React from 'react';
import Appbar from '../../../components/appbar';
import Markdown from '../../../components/markdown';
import installMD from './install';
import style from './style';

class Install extends React.Component {
  render () {
    return (
      <div>
        <Appbar/>
        <Markdown className={style.install} markdown={installMD} />
      </div>
    );
  }
}

export default Install;
