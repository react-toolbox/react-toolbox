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

        <Chip>Example chip</Chip>
        <Chip>
          <span style={{textDecoration: 'line-through'}}>Standard</span>
          <strong>Custom</strong> chip <small>(custom markup)</small>
        </Chip>

        {
          this.state.deleted ? null : (
            <Chip
              deletable
              onDeleteClick={this.handleDeleteClick}
            >
              Deletable Chip
            </Chip>
          )
        }

        <Chip>
          <Avatar style={{backgroundColor: 'deepskyblue'}} icon="folder" />
          <span>Avatar Chip</span>
        </Chip>

        <Chip>
          <Avatar title="A" /><span>Initial chip</span>
        </Chip>

        <Chip>
          <Avatar><img src="https://placeimg.com/80/80/animals"/></Avatar>
          <span>Image contact chip</span>
        </Chip>
      </section>
    );
  }
}

export default ChipTest;

