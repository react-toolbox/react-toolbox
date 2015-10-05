/* global React */

import Card from '../../components/card';

export default React.createClass({
  displayName: 'CardTest',

  onClick () {
    console.log('onClick', arguments);
  },

  onActionClick () {
    console.log('onClick', arguments);
  },

  render () {
    const text = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';
    const legend = 'Lorem Ipsum is simply dummy text';
    const actions = [
      { label: 'Save', icon: 'add', className: 'flat accent', onClick: this.onActionClick },
      { label: 'Close', className: 'flat', onClick: this.onActionClick }];

    return (
      <section>
        <h2>Cards</h2>
        <h3>Basic properties</h3>
        <Card title='Default Card' />
        <Card title='Default Card loading' loading />
        <Card title='Default Card with text' text={text} />
        <Card title='Default Card with actions' actions={actions} />
        <Card title='Default Card with text and image' text={text} image='https://avatars2.githubusercontent.com/u/559654?v=3&s=460' />
        <Card title='Default Card with text, image and color' text={text} color='#e91e63' image='https://avatars2.githubusercontent.com/u/559654?v=3&s=460' />
        <Card title='Default Card with text, image and color' text={text} color='#00bcd4' image='https://avatars2.githubusercontent.com/u/1634922?v=3&s=460' />
        <Card title='Default Card with text, color and onClick event' text={text} color='#e91e63' onClick={this.onClick} />
        <Card title='Default Card loading with text, color and onClick event' text={text} color='#e91e63' onClick={this.onClick} loading />
        <Card type='square' title='Wide card with text and onClick event' text={text} color='#00bcd4' onClick={this.onClick} />
        <Card type='wide' title='Wide card with text and onClick event' text={text} color='#00bcd4' onClick={this.onClick} />
      </section>
    );
  }
});
