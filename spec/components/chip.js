import React from 'react';
import Avatar from '../../components/avatar';
import Chip from '../../components/chip';
import style from '../style.module.css';
import { cold } from 'react-hot-loader';

const ColdAvatar = cold(Avatar)

class ChipTest extends React.Component {
  state = {
    deleted: false,
  };

  handleDeleteClick = () => {
    this.setState({
      deleted: true,
    });
  };

  render() {
    return (
      <section>
        <h5>Chips</h5>
        <p>Chips can be deletable and have an avatar.</p>

        <Chip>Example chip</Chip>
        <Chip>
          <span style={{ textDecoration: 'line-through' }}>Standard</span>
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
          <ColdAvatar style={{ backgroundColor: 'deepskyblue' }} icon="folder" />
          <span>Avatar Chip</span>
        </Chip>

        <Chip>
          <ColdAvatar title="A" /><span>Initial chip</span>
        </Chip>

        <Chip>
          <ColdAvatar><img src="https://placeimg.com/80/80/animals" /></ColdAvatar>
          <span>Image contact chip</span>
        </Chip>

        <div className={style.chipTruncateWrapper}>
          <Chip deletable>
            Truncated chip with long label. Lorem ipsum Amet quis mollit Excepteur id dolore.
          </Chip>
        </div>

      </section>
    );
  }
}

export default ChipTest;

