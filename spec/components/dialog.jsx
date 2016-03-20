import React, { PropTypes } from 'react';
import Button from '../../components/button';
import Dialog from '../../components/dialog';

class DialogTest extends React.Component {
  state = {
    active: false
  };

  handleToggle = () => {
    this.setState({
      active: !this.state.active
    });
  };

  actions = [
    { label: 'Disagree', primary: true, onClick: this.handleToggle },
    { label: 'Agree', primary: true, onClick: this.handleToggle }
  ];

  render () {
    return (
      <section>
        <h5>Dialog</h5>
        <p>lorem ipsum...</p>
        <Button label='Show Dialog' raised primary onClick={this.handleToggle} />
        <ContextComponent>
          <Dialog
            actions={this.actions}
            active={this.state.active}
            title="Use Google's location service?"
            onOverlayClick={this.handleToggle}
            onEscKeyDown={this.handleToggle}
          >
            <p>Let Google help apps <strong>determine location</strong>. This means sending anonymous location data to Google, even when no apps are running.</p>
            <DialogChild />
          </Dialog>
        </ContextComponent>
      </section>
    );
  }
}

class ContextComponent extends React.Component {
  static propTypes = {
    children: PropTypes.any
  };

  static childContextTypes = {
    message: PropTypes.string
  }

  getChildContext () {
    return {
      message: 'Hi, I\'m the top container'
    };
  }

  render () {
    return this.props.children;
  }
}

class DialogChild extends React.Component {
  static contextTypes = {
    message: PropTypes.string
  }

  render () {
    return <p>This message comes from a parent: <strong>{this.context.message}</strong></p>;
  }
}

export default DialogTest;
