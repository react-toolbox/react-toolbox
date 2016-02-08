import React from 'react';
import ClassNames from 'classnames';
import style from './style';

const NavDrawer = (props) => {

    const rootClasses = ClassNames([style.navDrawer], {
        [style['permanent-' + props.permanentAt]]: props.permanentAt,
        [style.wide]: (props.width === 'wide'),
        [style.active]: props.active,
        [style.pinned]: props.pinned
    }, props.className);

    const drawerClasses = ClassNames(style.drawerContent, {
        [style.scrollY]: props.scrollY
    });

    return (
        <div data-react-toolbox='nav-drawer' className={rootClasses} onClick={props.onOverlayClick}>
            <div data-react-toolbox='nav-drawer-scrim' className={style.scrim}>
                <aside data-react-toolbox='nav-drawer-content' className={drawerClasses}>
                    {props.children}
                </aside>
            </div>
        </div>
    );
};

NavDrawer.propTypes = {
    active: React.PropTypes.bool,
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    onOverlayClick: React.PropTypes.func,
    permanentAt: React.PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'xxl', 'xxxl']),
    pinned: React.PropTypes.bool,
    scrollY: React.PropTypes.bool,
    width: React.PropTypes.oneOf(['normal', 'wide'])
};

NavDrawer.defaultProps = {
    active: false,
    className: '',
    scrollY: false,
    width: 'normal'
};

export default NavDrawer;
