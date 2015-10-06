/* global React */

import Checkbox from '../../components/checkbox';

export default React.createClass({
  handleChange (event, instance) {
    console.log('Changed!', instance.getValue());
  },

  handleFocus () {
    console.log('Focused');
  },

  handleBlur () {
    console.log('Blur');
  },

  render () {
    return (
      <section>
        <h2>Checkbox</h2>
        <p style={{marginBottom: '10px'}}>Lorem ipsum...</p>
        <Checkbox
          label="Checked checkbox"
          checked
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <Checkbox
          label="Not checked biatch"
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <Checkbox
          label="Disabled checkbox"
          checked
          disabled
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </section>
    );
  }
});
