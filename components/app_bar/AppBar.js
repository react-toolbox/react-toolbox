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
      leftIcon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
      ]),
      onLeftIconClick: PropTypes.func,
      onRightIconClick: PropTypes.func,
      rightIcon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
      ]),
      scrollHide: PropTypes.bool,
      theme: PropTypes.shape({
        appBar: PropTypes.string,
        inner: PropTypes.string,
        fixed: PropTypes.string,
        flat: PropTypes.string,
        leftIcon: PropTypes.string,
        rightIcon: PropTypes.string,
        scrollHide: PropTypes.string,
        title: PropTypes.string,
      }),
      title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
      ]),
    };

    static defaultProps = {
      className: '',
      fixed: false,
      flat: false,
      scrollHide: false,
    };

    state = { hidden: false, height: 0 };

    componentDidMount() {
      if (this.props.scrollHide) {
        this.initializeScroll();
      }
    }

    componentWillReceiveProps(nextProps) {
      if (!this.props.scrollHide && nextProps.scrollHide) {
        this.initializeScroll();
      }

      if (this.props.scrollHide && !nextProps.scrollHide) {
        this.endScroll();
      }
    }

    componentWillUnmount() {
      if (this.props.scrollHide) {
        this.endScroll();
      }
    }

    initializeScroll() {
      window.addEventListener('scroll', this.handleScroll);
      const { height } = this.rootNode.getBoundingClientRect();
      this.curScroll = window.scrollY;
      this.setState({ height });
    }

    endScroll() {
      window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
      const scrollDiff = this.curScroll - window.scrollY;
      const hidden = scrollDiff < 0
        && window.scrollY !== undefined
        && window.scrollY > this.state.height;
      this.setState({ hidden });
      this.curScroll = window.scrollY;
    };

    render() {
      const {
        children,
        leftIcon,
        onLeftIconClick,
        onRightIconClick,
        rightIcon,
        theme,
        title,
      } = this.props;

      const className = cn(theme.appBar, {
        [theme.fixed]: this.props.fixed,
        [theme.flat]: this.props.flat,
        [theme.scrollHide]: this.state.hidden,
      }, this.props.className);

      const renderedTitle = typeof title === 'string'
        ? <h1 className={cn(theme.title)}>{title}</h1>
        : title;

      const renderedLeftIcon = leftIcon && (
        <IconButton
          inverse
          className={cn(theme.leftIcon)}
          onClick={onLeftIconClick}
          icon={leftIcon}
        />
      );

      const renderedRightIcon = rightIcon && (
        <IconButton
          inverse
          className={cn(theme.rightIcon)}
          onClick={onRightIconClick}
          icon={rightIcon}
        />
      );

      return (
        <header
          className={className}
          data-react-toolbox="app-bar"
          ref={(node) => { this.rootNode = node; }}
        >
          <div className={theme.inner}>
            {renderedLeftIcon}
            {renderedTitle}
            {children}
            {renderedRightIcon}
          </div>
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
