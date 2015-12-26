import React from 'react';
import Ripple from '../../components/ripple';

export default class RippleTest extends React.Component {
  render () {
    return (
      <div>
        <section>
          <h5> Adding ripple to components </h5>
          <div> Ripple set to false: <RippledParent ripple={false}/> </div>
          <div> Class Component: <RippledParent/> </div>
          <div> Functional Component: <RippledFunctionalComponent/> </div>
          <div> Disabled Component: <RippledParent disabled/> </div>

          <h5>Extending Rippled Component</h5>
          <div> Parent: <Parent/> </div>
          <div> Child: <Child/> </div>
          <div> Child of rippled parent: <RippledChild/> </div>
        </section>
      </div>
    );
  }
}


class Parent extends React.Component{
  static propTypes = {
    children: React.PropTypes.array
  }

  whoami () {
    return 'I am a parent';
  }

  render () {
    return (
      <span style={{position: 'relative'}}>
        <span> <b> {this.whoami()} </b> </span>
        {this.props.children}
      </span>
    );
  }
}

const RippledParent = Ripple()(Parent);

class RippledChild extends RippledParent {
  whoami () {
    return 'I am a rippled child';
  }
}

class Child extends Parent {
  whoami () {
    return 'I am a child';
  }
}

const FunctionalComponent = () => {
  return <span style={{position: 'relative'}}> <b> I'm a functional component </b> </span>;
};

const RippledFunctionalComponent = Ripple()(FunctionalComponent);
