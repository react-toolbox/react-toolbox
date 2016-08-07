import React from 'react';
import ProgressBar from '../../components/progress_bar';
import style from '../style';

const initialState = {
  progress: 0,
  buffer: 10
};

class ProgressBarTest extends React.Component {
  state = initialState;

  componentWillMount () {
    this.simulateProgress();
  }

  simulateProgress () {
    setTimeout(() => {
      if (this.state.progress < 100) {
        this.increaseProgress();
        if (this.state.progress > this.state.buffer) this.increaseBuffer();
      } else {
        this.setState(initialState);
      }
      this.simulateProgress();
    }, (Math.random() * 1 + 1) * 1000);
  }

  increaseProgress () {
    this.setState({
      progress: Math.random() * 30 + this.state.progress
    });
  }

  increaseBuffer () {
    this.setState({
      buffer: Math.random() * (100 - this.state.progress) + this.state.progress
    });
  }

  render () {
    return (
      <section>
        <h5>Progress bars</h5>
        <p style={{margin: '10px auto'}}>Determinate</p>
        <ProgressBar mode='determinate' value={this.state.progress} buffer={this.state.buffer}/>
        <p style={{margin: '10px auto'}}>Indeterminate...</p>
        <ProgressBar mode='indeterminate'/>
        <p style={{margin: '10px auto'}}>Circular</p>
        <ProgressBar type='circular' mode='indeterminate'/>
        <p style={{margin: '10px auto'}}>Circular with custom size</p>
        <ProgressBar className={style.customSizedProgress} type='circular' mode='indeterminate' theme={style} />
      </section>
    );
  }
}

export default ProgressBarTest;
