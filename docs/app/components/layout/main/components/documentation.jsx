import React from 'react';
import components from '../modules/components';
import style from './documentation.scss';

const Component = (props) => {
  const html = { __html: components[props.params.component].docs };
  return (
    <div
      className={style.documentation}
      dangerouslySetInnerHTML={html}
    />
  );
};

export default Component;
