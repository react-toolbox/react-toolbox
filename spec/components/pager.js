import React, { PropTypes } from 'react';
import Pager from '../../components/pager';
import FontIcon from '../../components/font_icon';
import Input from '../../components/input';
import style from '../style';

class PagerTest extends React.Component {

  static propTypes = {
    visiblePagesBlockSize: PropTypes.number
  };

  static defaultProps = {
    visiblePagesBlockSize: 3
  }

  state = {
    lastPage: 29,
    currentPage: 5
  }

  onInputChange = (name, value) => {
    const state = this.state;

    state[name] = value;

    this.setState({
        ...state
    });
  }

  onPageChange (oldPage, newPage) {
    console.info('Previous page : ' + oldPage + ', Selected page: ' + newPage);
  }

  render () {

    return (
      <section>
        <h5>Pager</h5>
        <p>Pager based on Material design.</p>

        <div className={style.pager}>
          <Pager
              prevButtonContent={<FontIcon value='chevron_left' />}
              nextButtonContent={<FontIcon value='chevron_right' />}
              rangeLeftButtonContent={<FontIcon value='more_horiz' />}
              rangeRightButtonContent={<FontIcon value='more_horiz' />}
              lastPage={this.state.lastPage}
              currentPage={this.state.currentPage}
              visiblePagesBlockSize={this.props.visiblePagesBlockSize}
              onPageChange={this.onPageChange}
          />
        </div>

        <Input
          type='number'
          value={this.state.lastPage}
          label='Last Page' onChange={this.onInputChange.bind(this, 'lastPage')}
        />

      </section>
    );
  }
}

export default PagerTest;
