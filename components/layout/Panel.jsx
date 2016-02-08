import React from 'react';
import ClassNames from 'classnames';
import style from './style';

const Panel = (props) => {
    const className = ClassNames(style.panel, {
        [style.scrollY]: props.scrollY
    }, props.className);

    return (
        <div data-react-toolbox='panel' className={className}>
            {props.children}
        </div>
    );
};

Panel.propTypes = {
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    scrollY: React.PropTypes.bool
};

Panel.defaultProps = {
    className: '',
    scrollY: false
};

export default Panel;
