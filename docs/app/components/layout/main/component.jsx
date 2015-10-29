import React from 'react';
import ToolboxComponents from './components';
import style from './component.scss';

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
