import React from 'react';
import Avatar from '../../components/avatar';
import Chip from '../../components/chip';

class ChipTest extends React.Component {
  state = {
    deleted: false
  };

  handleDeleteClick = () => {
    this.setState({
      deleted: true
    });
  };

  render () {
    return (
      <section>
        <h5>Chips</h5>
        <p>Chips can be deletable and have an avatar.</p>

        <Chip label="Example Chip" />
        {
          this.state.deleted ? null : (
            <Chip
              label="Deletable Chip"
              deletable
              onDeleteClick={this.handleDeleteClick}
            />
          )
        }
        <Chip
          label="Avatar Chip"
          avatar={<Avatar style={{backgroundColor: 'deepskyblue'}} icon="folder" />}
        />
        <Chip
          label="Initial chip"
          avatar={<Avatar title="A" />}
          deletable
        />
        <Chip
          label="Image contact chip"
          avatar={<Avatar><img src="https://placeimg.com/80/80/animals"/></Avatar>}
        />
      </section>
    );
  }
}

export default ChipTest;
