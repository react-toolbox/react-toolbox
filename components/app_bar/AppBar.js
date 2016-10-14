import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { APP_BAR } from '../identifiers.js';
import InjectIconButton from '../button/IconButton.js';

const factory = (IconButton) => {
  class AppBar extends React.Component {
    static propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      fixed: PropTypes.bool,
      flat: PropTypes.bool,
      leftIcon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
      ]),
      onLeftIconClick: PropTypes.func,
      onRightIconClick: PropTypes.func,
      rightIcon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
      ]),
      scrollHide: PropTypes.bool,
      theme: PropTypes.shape({
        appBar: PropTypes.string,
        fixed: PropTypes.string,
        flat: PropTypes.string,
        leftIcon: PropTypes.string,
        rightIcon: PropTypes.string,
        title: PropTypes.string
      }),
      title: PropTypes.string
    };

    static defaultProps = {
      className: '',
      fixed: false,
      flat: false,
      scrollHide: false
    };

    state = {hidden: false, height: 0};

    componentDidMount () {
      if (this.props.scrollHide) {
        this.initializeScroll();
      }
    }

    componentWillReceiveProps (nextProps) {
      if (!this.props.scrollHide && nextProps.scrollHide) {
        this.initializeScroll();
      }

      if (this.props.scrollHide && !nextProps.scrollHide) {
        this.endScroll();
      }
    }

    componentWillUnmount () {
      if (this.props.scrollHide) {
        this.endScroll();
      }
    }

    initializeScroll = () => {
      window.addEventListener('scroll', this.handleScroll);
      const { height } = this.rootNode.getBoundingClientRect();
      this.curScroll = window.scrollY;
      this.setState({height});
    };

    endScroll = () => {
      window.removeEventListener('scroll', this.handleScroll);
    };

    handleScroll = () => {
      const scrollDiff = this.curScroll - window.scrollY;
      const hidden = scrollDiff < 0 && window.scrollY !== undefined && window.scrollY > this.state.height;
      this.setState({hidden});
      this.curScroll = window.scrollY;
    };

    render () {
      const { children, leftIcon, onLeftIconClick, onRightIconClick, rightIcon, theme, title } = this.props;
      const className = classnames(theme.appBar, {
        [theme.fixed]: this.props.fixed,
        [theme.flat]: this.props.flat,
        [theme.scrollHide]: this.state.hidden
      }, this.props.className);

      return (
        <header
          className={className}
          data-react-toolbox='app-bar'
          ref={node => {this.rootNode = node;}}
        >
          {leftIcon && <IconButton
            inverse
            className={classnames(theme.leftIcon)}
            onClick={onLeftIconClick}
            icon={leftIcon} />
          }
          {title && <h1 className={classnames(theme.title)}>{title}</h1>}
          {children}
          {rightIcon && <IconButton
            inverse
            className={classnames(theme.rightIcon)}
            onClick={onRightIconClick}
            icon={rightIcon} />
          }
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
