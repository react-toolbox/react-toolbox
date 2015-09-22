/* global React */

import Switch from '../../components/switch';

export default React.createClass({
  displayName: 'SwitchTest',

  onChange (event, instance) {
    console.log('[SWITCH]', instance.getValue());
  },

  render () {
    return (
      <section>
        <h2>Switches</h2>
        <p>Default</p>
        <Switch />
        <p>With properties</p>
        <Switch value={true} label="Online" onChange={this.onChange} />
        <p>Disabled</p>
        <Switch disabled/>
      </section>
    );
  }
});
