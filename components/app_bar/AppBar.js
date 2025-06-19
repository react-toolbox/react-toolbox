// FINAL CLEAN AppBar.js (Responsive + ESLint-safe)

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { themr } from 'react-css-themr';
import { APP_BAR } from '../identifiers';
import InjectIconButton from '../button/IconButton';

const factory = (IconButton) => {
  class AppBar extends React.Component {
    static propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      fixed: PropTypes.bool,
      flat: PropTypes.bool,
      leftIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
      onLeftIconClick: PropTypes.func,
      onRightIconClick: PropTypes.func,
      rightIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
      scrollHide: PropTypes.bool,
      theme: PropTypes.shape({
        appBar: PropTypes.string,
        center: PropTypes.string,
        fixed: PropTypes.string,
        flat: PropTypes.string,
        innerResponsive: PropTypes.string,
        left: PropTypes.string,
        leftIcon: PropTypes.string,
        right: PropTypes.string,
        rightIcon: PropTypes.string,
        scrollHide: PropTypes.string,
        title: PropTypes.string,
      }),
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    };

    static defaultProps = {
      className: '',
      fixed: false,
      flat: false,
      scrollHide: false,
    };

    state = { hidden: false };

    componentDidMount() {
      if (this.props.scrollHide) {
        this.initializeScroll();
      }
    }

    componentDidUpdate(prevProps) {
      if (!prevProps.scrollHide && this.props.scrollHide) {
        this.initializeScroll();
      }
      if (prevProps.scrollHide && !this.props.scrollHide) {
        this.endScroll();
      }
    }

    componentWillUnmount() {
      if (this.props.scrollHide) {
        this.endScroll();
      }
    }

    handleScroll = () => {
      const scrollDiff = this.curScroll - window.scrollY;
      this.setState({
        hidden: scrollDiff < 0 && window.scrollY > 64, // fallback to 64px height
      });
      this.curScroll = window.scrollY;
    };

    initializeScroll = () => {
      window.addEventListener('scroll', this.handleScroll);
      this.curScroll = window.scrollY;
    };

    endScroll = () => {
      window.removeEventListener('scroll', this.handleScroll);
    };

    render() {
      const {
        children,
        className,
        fixed,
        flat,
        leftIcon,
        rightIcon,
        onLeftIconClick,
        onRightIconClick,
        scrollHide,
        theme,
        title,
        ...others
      } = this.props;

      const _className = cn(
        theme.appBar,
        {
          [theme.fixed]: fixed,
          [theme.flat]: flat,
          [theme.scrollHide]: this.state.hidden,
        },
        className,
      );

      return (
        <header
          {...others}
          className={_className}
          data-react-toolbox="app-bar"
          ref={(node) => {
            this.rootNode = node;
          }}
        >
          <div className={theme.innerResponsive}>
            <div className={theme.left}>
              {leftIcon && (
                <IconButton
                  inverse
                  className={cn(theme.leftIcon)}
                  onClick={onLeftIconClick}
                  icon={leftIcon}
                />
              )}
            </div>

            <div className={theme.center}>
              {title && (
                <h1 className={theme.title}>
                  {typeof title === 'string' ? title : title}
                </h1>
              )}
            </div>

            <div className={theme.right}>
              {rightIcon && (
                <IconButton
                  inverse
                  className={cn(theme.rightIcon)}
                  onClick={onRightIconClick}
                  icon={rightIcon}
                />
              )}
            </div>
          </div>

          {children}
        </header>
      );
    }
  }

  return AppBar;
};

const AppBar = factory(InjectIconButton);
export default themr(APP_BAR)(AppBar);
export { factory as appBarFactory };
export { AppBar };
