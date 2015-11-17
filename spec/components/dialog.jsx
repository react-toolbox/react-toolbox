import React from 'react';
import Button from '../../components/button';
import Dialog from '../../components/dialog';
import Tooltip from '../../components/tooltip';

class DialogTest extends React.Component {
  state = {
    active: false
  };

  handleToggle = () => {
    this.setState({
      active: !this.state.active
    });
  }

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
        <Dialog
          actions={this.actions}
          active={this.state.active}
          title="Use Google's location service?"
          onOverlayClick={this.handleToggle}
        >
          <p>Let Google help apps <strong><Tooltip label='location' />determine location</strong>. This means sending anonymous location data to Google, even when no apps are running.</p>
        </Dialog>
      </section>
    );
  }
}

export default DialogTest;
