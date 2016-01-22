import StatelessComponent from './StatelessComponent';
import AddRippleToComponent from './AddRippleToComponent';

const defaults = {
  centered: false,
  className: '',
  spread: 2
};

const Ripple = (options = {}) => {
  return ComposedComponent => {
    let Component = ComposedComponent;
    if (ComposedComponent.prototype.render === undefined) {
       Component = StatelessComponent(ComposedComponent);
    }

    return AddRippleToComponent(Component, {...defaults, ...options});

  };
};

export default Ripple;
