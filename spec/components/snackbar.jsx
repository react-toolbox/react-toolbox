import React from 'react';
import Snackbar from '../../components/snackbar';

export default React.createClass({
  displayName: 'ButtonTest',

  render () {
    return (
      <section>
        <h5>Snackbars & Toasts</h5>
        <p>lorem ipsum...</p>
        <Snackbar caption='Message sent' />
        <Snackbar caption='Message sent' icon='question-answer' />
        <Snackbar caption='Marked as read' />
        <Snackbar caption='Marked as read' />

        <p>lorem ipsum...</p>
      </section>
    );
  }
});
