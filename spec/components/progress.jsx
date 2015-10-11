import React from 'react';
import ProgressBar from '../../components/progress_bar';

export default React.createClass({
  displayName: 'ProgressBarTest',

  getInitialState () {
    return {
      progress: 0,
      buffer: 10
    };
  },

  componentWillMount () {
    this.simulateProgress();
  },

  simulateProgress () {
    setTimeout(() => {
      if (this.state.progress < 100) {
        this.increaseProgress();
        if (this.state.progress > this.state.buffer) this.increaseBuffer();
      } else {
        this.replaceState(this.getInitialState());
      }
      this.simulateProgress();
    }, (Math.random() * 1 + 1) * 1000);
  },

  increaseProgress () {
    this.setState({
      progress: Math.random() * 30 + this.state.progress
    });
  },

  increaseBuffer () {
    this.setState({
      buffer: Math.random() * (100 - this.state.progress) + this.state.progress
    });
  },

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
      </section>
    );
  }
});
