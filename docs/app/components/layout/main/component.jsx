/*eslint-disable no-unused-vars*/
import React from 'react';
import ToolboxComponents from './components';
import style from './style';

const Component = (props) => {
  const html = { __html: ToolboxComponents[props.params.component].docs };
  return (
    <div
      className={style.documentation}
      dangerouslySetInnerHTML={html}
    />
  );
};

export default Component;
