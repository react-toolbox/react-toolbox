import React, { PropTypes } from 'react';
import Button from '../../components/button';
import Dialog from '../../components/dialog';
import Dropdown from '../../components/dropdown';

const dialogTypes = [
  {value: 'small', label: 'small'},
  {value: 'normal', label: 'normal'},
  {value: 'large', label: 'large'},
  {value: 'fullscreen', label: 'fullscreen'}
];

class DialogTest extends React.Component {
  state = {
    active: false,
    active2: false,
    active3: false,
    type: 'normal'
  };

  handleToggle = () => {
    this.setState({
      active: !this.state.active
    });
  };

  handleToggle2 = () => {
    this.setState({
      active2: !this.state.active2
    });
  };

  handleToggle3 = () => {
    this.setState({
      active3: !this.state.active3
    });
  };

  changeDialogType = (value) => {
    this.setState({type: value});
  };

  actions = [
    { label: 'Disagree', primary: true, onClick: this.handleToggle },
    { label: 'Agree', primary: true, onClick: this.handleToggle }
  ];

  actions2 = [
    { label: 'Close', primary: true, onClick: this.handleToggle2 }
  ];

  actions3 = [
    { label: 'Disagree', primary: true, onClick: this.handleToggle3 },
    { label: 'Agree', primary: true, onClick: this.handleToggle3 }
  ];

  render () {
    return (
      <section>
        <h5>Dialog</h5>

        <Dropdown
          label='Dialog Type'
          auto
          onChange={this.changeDialogType}
          source={dialogTypes}
          value={this.state.type}
        />

        <p>lorem ipsum...</p>
        <Button label='Show Dialog' raised primary onClick={this.handleToggle} />
        <ContextComponent>
          <Dialog
            actions={this.actions}
            active={this.state.active}
            type={this.state.type}
            title="Use Google's location service?"
            onOverlayClick={this.handleToggle}
            onEscKeyDown={this.handleToggle}
          >
            <p>Let Google help apps <strong>determine location</strong>. This means sending anonymous location data to Google, even when no apps are running.</p>
            <DialogChild />
          </Dialog>
        </ContextComponent>

        <p>Centered dialog</p>
        <Button label='Show Dialog' raised primary onClick={this.handleToggle3} />
        <ContextComponent>
          <Dialog
            centered={true}
            actions={this.actions3}
            active={this.state.active3}
            type={this.state.type}
            title="Use Google's location service?"
            onOverlayClick={this.handleToggle3}
            onEscKeyDown={this.handleToggle3}
          >
            <p>Let Google help apps <strong>determine location</strong>. This means sending anonymous location data to Google, even when no apps are running.</p>
            <DialogChild />
          </Dialog>
        </ContextComponent>

        <p>Dialog with huge content</p>
        <Button label='Show Dialog' raised primary onClick={this.handleToggle2} />
        <ContextComponent>
          <Dialog
            actions={this.actions2}
            active={this.state.active2}
            autoHeight={true}
            type={this.state.type}
            title="Use Google's location service?"
            onOverlayClick={this.handleToggle2}
            onEscKeyDown={this.handleToggle2}
          >
            <p>
              <a name="1.1.2"></a>
              ## 1.1.2 (2016-08-11)

              * 1.1.2 release ([0dcec60](https://github.com/react-toolbox/react-toolbox/commit/0dcec60))
              * Added missing modules ([afc2124](https://github.com/react-toolbox/react-toolbox/commit/afc2124))
              * Added Touch events to the base props ([30f1623](https://github.com/react-toolbox/react-toolbox/commit/30f1623))
              * fix for target missing id ([b557561](https://github.com/react-toolbox/react-toolbox/commit/b557561))
              * Fixed #696 - Button Icon/Inner Alignment ([5c09c5c](https://github.com/react-toolbox/react-toolbox/commit/5c09c5c)), closes [#696](https://github.com/react-toolbox/react-toolbox/issues/696)
              * Fixes for typescript definitions, typos etc. ([213411b](https://github.com/react-toolbox/react-toolbox/commit/213411b))
              * Remove prop duplicates ([c016565](https://github.com/react-toolbox/react-toolbox/commit/c016565))

              <a name="1.1.1"></a>
              ## 1.1.1 (2016-08-08)

              * 1.1.1 release ([56426b9](https://github.com/react-toolbox/react-toolbox/commit/56426b9))
              * Fix linter for tooltip theme ([f09a9d7](https://github.com/react-toolbox/react-toolbox/commit/f09a9d7))
              * Move addon-update to peerDependencies ([fac66cb](https://github.com/react-toolbox/react-toolbox/commit/fac66cb))

              <a name="1.1.0"></a>
              # 1.1.0 (2016-08-07)

              * 1.1.0 release ([c671290](https://github.com/react-toolbox/react-toolbox/commit/c671290))
              * Add an active property to control pickers from outside ([39694e5](https://github.com/react-toolbox/react-toolbox/commit/39694e5))
              * Add create option to autocomplete ([3461a1f](https://github.com/react-toolbox/react-toolbox/commit/3461a1f))
              * Add required polyfills for IE11. ([ef6a979](https://github.com/react-toolbox/react-toolbox/commit/ef6a979))
              * Added custom sized circular ProgressBar to spec ([bdd2ce3](https://github.com/react-toolbox/react-toolbox/commit/bdd2ce3))
              * Added support for locale on DatePicker dialog component ([01ae580](https://github.com/react-toolbox/react-toolbox/commit/01ae580))
              * Added viewBox attr to svg element of circular ProgressBar to allow custom sizing ([a2c8f08](https://github.com/react-toolbox/react-toolbox/commit/a2c8f08))
              * Avoid !important in progress spec ([f56eb82](https://github.com/react-toolbox/react-toolbox/commit/f56eb82))
              * Better tooltips ([fcc7902](https://github.com/react-toolbox/react-toolbox/commit/fcc7902))
              * Beware of the multiple onRippleEnded ([c01c025](https://github.com/react-toolbox/react-toolbox/commit/c01c025))
              * Bugfix for IE scrollX/scrollY ([955acf0](https://github.com/react-toolbox/react-toolbox/commit/955acf0))
              * Change method name to match lib convention ([ea3917e](https://github.com/react-toolbox/react-toolbox/commit/ea3917e))
              * Change name from create to allowCreate in Autocomplete and fix linter warnings ([4093439](https://github.com/react-toolbox/react-toolbox/commit/4093439))
              * Don't render Ripple if it's not being animated ([032840e](https://github.com/react-toolbox/react-toolbox/commit/032840e))
              * Fix #547 ([f2dbfb5](https://github.com/react-toolbox/react-toolbox/commit/f2dbfb5)), closes [#547](https://github.com/react-toolbox/react-toolbox/issues/547)
              * Fix linter errors ([fae42a8](https://github.com/react-toolbox/react-toolbox/commit/fae42a8))
              * Fix linter errors and refactor ([e597bc5](https://github.com/react-toolbox/react-toolbox/commit/e597bc5))
              * Fix linter warnings ([77b0a4a](https://github.com/react-toolbox/react-toolbox/commit/77b0a4a))
              * Fix remove animation event function ([2bd6539](https://github.com/react-toolbox/react-toolbox/commit/2bd6539))
              * FIXED aslant errors and warnings to pass Travis check ([157c29d](https://github.com/react-toolbox/react-toolbox/commit/157c29d))
              * Fixed Autocomplete such that it does not error when provided with a value prop that does not exist i ([59b01e6](https://github.com/react-toolbox/react-toolbox/commit/59b01e6))
              * Fixes #586 ([041e00c](https://github.com/react-toolbox/react-toolbox/commit/041e00c)), closes [#586](https://github.com/react-toolbox/react-toolbox/issues/586)
              * Fixes #629 ([e2c5471](https://github.com/react-toolbox/react-toolbox/commit/e2c5471)), closes [#629](https://github.com/react-toolbox/react-toolbox/issues/629)
              * Fixes #663 ([023a732](https://github.com/react-toolbox/react-toolbox/commit/023a732)), closes [#663](https://github.com/react-toolbox/react-toolbox/issues/663)
              * Fixes #671 ([991da71](https://github.com/react-toolbox/react-toolbox/commit/991da71)), closes [#671](https://github.com/react-toolbox/react-toolbox/issues/671)
              * Fixes #674 ([fd138f9](https://github.com/react-toolbox/react-toolbox/commit/fd138f9)), closes [#674](https://github.com/react-toolbox/react-toolbox/issues/674)
              * Fixes #678 ([730d4c1](https://github.com/react-toolbox/react-toolbox/commit/730d4c1)), closes [#678](https://github.com/react-toolbox/react-toolbox/issues/678)
              * Fixes Autocomplete error when provided value prop that is not in source option while preserving valu ([0bce911](https://github.com/react-toolbox/react-toolbox/commit/0bce911))
              * Fixes linting errors ([01711e6](https://github.com/react-toolbox/react-toolbox/commit/01711e6))
              * Latest build ([146ffee](https://github.com/react-toolbox/react-toolbox/commit/146ffee))
              * Latest build ([0c53de9](https://github.com/react-toolbox/react-toolbox/commit/0c53de9))
              * Latest build ([b58254d](https://github.com/react-toolbox/react-toolbox/commit/b58254d))
              * Latest build ([50c5aeb](https://github.com/react-toolbox/react-toolbox/commit/50c5aeb))
              * Latest build ([57bb663](https://github.com/react-toolbox/react-toolbox/commit/57bb663))
              * Minor fixes in docs ([25fd5e2](https://github.com/react-toolbox/react-toolbox/commit/25fd5e2))
              * pass theme from layout to children ([491a85c](https://github.com/react-toolbox/react-toolbox/commit/491a85c))
              * Refactor ripple adding multiple option ([71fcd3f](https://github.com/react-toolbox/react-toolbox/commit/71fcd3f))
              * Remove some bind usage in render functions and undo passing down Dropdown theme to Input ([a825208](https://github.com/react-toolbox/react-toolbox/commit/a825208))
              * Update dependencies ([f250f6f](https://github.com/react-toolbox/react-toolbox/commit/f250f6f))
              * Update docs dependencies ([714883c](https://github.com/react-toolbox/react-toolbox/commit/714883c))
              * Update react-css-themr dependency ([692b0be](https://github.com/react-toolbox/react-toolbox/commit/692b0be))
              * feat(dist): add newest build ([62f8b22](https://github.com/react-toolbox/react-toolbox/commit/62f8b22))
              * feat(input): implement maxLength in js rather then using the maxlength prop of the input field ([a8dbad1](https://github.com/react-toolbox/react-toolbox/commit/a8dbad1)), closes [#685](https://github.com/react-toolbox/react-toolbox/issues/685)
              * feat(input): prevent insertion of characters if maxLength is reached ([70823af](https://github.com/react-toolbox/react-toolbox/commit/70823af))
              * feat(input): set the default row amount for multiline inputs to 1 ([056cd6d](https://github.com/react-toolbox/react-toolbox/commit/056cd6d))
              * doc(input): add note about handleChange implementation ([f29e570](https://github.com/react-toolbox/react-toolbox/commit/f29e570))
              * fix(input): always recalculate size ([d1fcc14](https://github.com/react-toolbox/react-toolbox/commit/d1fcc14))
              * fix(input): don't remove the maxLenght attribute from inputs ([6f03fb5](https://github.com/react-toolbox/react-toolbox/commit/6f03fb5))
              * fix(input): only remove resize event listerner if it exists ([75487fb](https://github.com/react-toolbox/react-toolbox/commit/75487fb))
              * fix(multiline input): autoresize after initial render too ([1809d67](https://github.com/react-toolbox/react-toolbox/commit/1809d67))
              * refactor(input): move autoresize to didUpdate ([8559c18](https://github.com/react-toolbox/react-toolbox/commit/8559c18))
              * docs(input): fix multiline example and add maxLength to it ([9a4f553](https://github.com/react-toolbox/react-toolbox/commit/9a4f553))

              <a name="1.0.3"></a>
              ## 1.0.3 (2016-07-25)

              * 1.0.3 release ([43ea2ef](https://github.com/react-toolbox/react-toolbox/commit/43ea2ef))
              * A lot of JSDoc comments added, even more left ([621e798](https://github.com/react-toolbox/react-toolbox/commit/621e798))
              * Added tests. ([4f67a93](https://github.com/react-toolbox/react-toolbox/commit/4f67a93))
              * Additional fix for raw AppBar component import ([32aedbd](https://github.com/react-toolbox/react-toolbox/commit/32aedbd))
              * All props are now commented ([ae6109c](https://github.com/react-toolbox/react-toolbox/commit/ae6109c))
              * Bugfix calculating Menu position ([e077f8a](https://github.com/react-toolbox/react-toolbox/commit/e077f8a))
              * Date picker now takes max/min date into account on mount/props change. ([e9487e1](https://github.com/react-toolbox/react-toolbox/commit/e9487e1))
              * Document CardTitle's cardTitle theme ([460a378](https://github.com/react-toolbox/react-toolbox/commit/460a378))
              * Document the label theme for the input component ([68ee32f](https://github.com/react-toolbox/react-toolbox/commit/68ee32f))
              * Ensure theme gets passed down to TimePicker child components ([a6f7d64](https://github.com/react-toolbox/react-toolbox/commit/a6f7d64))
              * fix autocomplete activating on react>=15.1 if no direction ([f3b460e](https://github.com/react-toolbox/react-toolbox/commit/f3b460e))
              * Fix multiselectable and unselect rows isues on Table component ([5ccd6da](https://github.com/react-toolbox/react-toolbox/commit/5ccd6da))
              * Fix typo in font-size calculation in mixins ([1639690](https://github.com/react-toolbox/react-toolbox/commit/1639690))
              * Fixes #542 ([c9ac90f](https://github.com/react-toolbox/react-toolbox/commit/c9ac90f)), closes [#542](https://github.com/react-toolbox/react-toolbox/issues/542)
              * Fixes #627 ([2d17b65](https://github.com/react-toolbox/react-toolbox/commit/2d17b65)), closes [#627](https://github.com/react-toolbox/react-toolbox/issues/627)
              * Latest build ([af9e889](https://github.com/react-toolbox/react-toolbox/commit/af9e889))
              * Made general mixins properties depend on $unit value ([fb29425](https://github.com/react-toolbox/react-toolbox/commit/fb29425))
              * Merge with dev ([b226fcd](https://github.com/react-toolbox/react-toolbox/commit/b226fcd))
              * Moved modules to separate files. ([10b69b5](https://github.com/react-toolbox/react-toolbox/commit/10b69b5))
              * Only add Input auto-resize handler to multiline inputs ([9cc56e1](https://github.com/react-toolbox/react-toolbox/commit/9cc56e1))
              * Pass theme down to list item child components for correct classnames ([5a9fec8](https://github.com/react-toolbox/react-toolbox/commit/5a9fec8))
              * Small fixes ([3b70677](https://github.com/react-toolbox/react-toolbox/commit/3b70677))
              * Typings for the project ([661911b](https://github.com/react-toolbox/react-toolbox/commit/661911b))
              * Update install.md ([42feb7f](https://github.com/react-toolbox/react-toolbox/commit/42feb7f))
              * Update README.md ([3a57270](https://github.com/react-toolbox/react-toolbox/commit/3a57270))

              <a name="1.0.2"></a>
              ## 1.0.2 (2016-07-10)

              * 1.0.2 release ([672429f](https://github.com/react-toolbox/react-toolbox/commit/672429f))
              * Add autoresize to multiline inputs ([5b97b95](https://github.com/react-toolbox/react-toolbox/commit/5b97b95)), closes [#278](https://github.com/react-toolbox/react-toolbox/issues/278)
              * Add passing unknown props and checking of keypress ([d01a576](https://github.com/react-toolbox/react-toolbox/commit/d01a576))
              * better support in typescript: ([69368ae](https://github.com/react-toolbox/react-toolbox/commit/69368ae))
              * Fix Number.isNaN TypeError on IE ([4ea305c](https://github.com/react-toolbox/react-toolbox/commit/4ea305c))
              * Fixes #585 ([49658a3](https://github.com/react-toolbox/react-toolbox/commit/49658a3)), closes [#585](https://github.com/react-toolbox/react-toolbox/issues/585)
              * Fixes #616 ([0513cb7](https://github.com/react-toolbox/react-toolbox/commit/0513cb7)), closes [#616](https://github.com/react-toolbox/react-toolbox/issues/616)
              * Fixes #624 ([2a7e340](https://github.com/react-toolbox/react-toolbox/commit/2a7e340)), closes [#624](https://github.com/react-toolbox/react-toolbox/issues/624)
              * Forward theme prop from Tabs to TabContent ([8c20848](https://github.com/react-toolbox/react-toolbox/commit/8c20848))
              * get rid of declaration duplicates in components/ ([febf8b5](https://github.com/react-toolbox/react-toolbox/commit/febf8b5))
              * Latest build ([f43dac6](https://github.com/react-toolbox/react-toolbox/commit/f43dac6))
              * Latest build ([b55d2b1](https://github.com/react-toolbox/react-toolbox/commit/b55d2b1))
              * missing MENU for some reason in identifiers ([e359805](https://github.com/react-toolbox/react-toolbox/commit/e359805))
              * Pass the theme from ListItem to ListItemLayout ([3b4387f](https://github.com/react-toolbox/react-toolbox/commit/3b4387f)), closes [#580](https://github.com/react-toolbox/react-toolbox/issues/580)
              * Reset overflow when unmounting ([a11fe92](https://github.com/react-toolbox/react-toolbox/commit/a11fe92))
              * Restyle a ternary ([8d65961](https://github.com/react-toolbox/react-toolbox/commit/8d65961))
              * Update datepicker_example_1.txt ([e782b8f](https://github.com/react-toolbox/react-toolbox/commit/e782b8f))
              * Update pickers.js ([49fa53a](https://github.com/react-toolbox/react-toolbox/commit/49fa53a))
              * Update to react 15.2.0 ([3e29844](https://github.com/react-toolbox/react-toolbox/commit/3e29844))
              * chore(dropdown): set value to empty string to prevent uncontrolled errors ([ad52adb](https://github.com/react-toolbox/react-toolbox/commit/ad52adb))

              <a name="1.0.1"></a>
              ## 1.0.1 (2016-06-19)

              * [Fixes #550] Add PropType checking to Menu's position and update docs ([eec457b](https://github.com/react-toolbox/react-toolbox/commit/eec457b)), closes [#550](https://github.com/react-toolbox/react-toolbox/issues/550)
              * #575: Use classname 'material-icons' if children is a string ([1d725dc](https://github.com/react-toolbox/react-toolbox/commit/1d725dc))
              * 🤖 ([79472ee](https://github.com/react-toolbox/react-toolbox/commit/79472ee))
              * 1.0.1 release ([b44b168](https://github.com/react-toolbox/react-toolbox/commit/b44b168))
              * add 'suggestionMatch' prop to Autocomplete component to determine how suggestions are matched ([afe5bf1](https://github.com/react-toolbox/react-toolbox/commit/afe5bf1))
              * Added ability to export the DatePickerDialog seperately from the DatePicker ([2d5f519](https://github.com/react-toolbox/react-toolbox/commit/2d5f519))
              * Added autoselect first option on enter ([7bffe8a](https://github.com/react-toolbox/react-toolbox/commit/7bffe8a))
              * change .overlay to .backdrop ([7134c64](https://github.com/react-toolbox/react-toolbox/commit/7134c64))
              * clear the timeout on componentWillUnmount ([647dbfb](https://github.com/react-toolbox/react-toolbox/commit/647dbfb))
              * feat(datepicker,timepicker): add support for `name` prop ([c850245](https://github.com/react-toolbox/react-toolbox/commit/c850245))
              * Fix #536 ([5b76a7f](https://github.com/react-toolbox/react-toolbox/commit/5b76a7f)), closes [#536](https://github.com/react-toolbox/react-toolbox/issues/536)
              * Fix #541 ([c19c3e7](https://github.com/react-toolbox/react-toolbox/commit/c19c3e7)), closes [#541](https://github.com/react-toolbox/react-toolbox/issues/541)
              * Fix #542 ([6cd4202](https://github.com/react-toolbox/react-toolbox/commit/6cd4202)), closes [#542](https://github.com/react-toolbox/react-toolbox/issues/542)
              * Fix a few incorrect exports in typings and build with updated Babel ([68926f8](https://github.com/react-toolbox/react-toolbox/commit/68926f8))
              * Fix cpx command to work correctly when coping sass and ts files ([688f6bc](https://github.com/react-toolbox/react-toolbox/commit/688f6bc))
              * Fix MenuItem onclick called without event ([53f4a5e](https://github.com/react-toolbox/react-toolbox/commit/53f4a5e))
              * Fixed bug with add a month to a date when current day is largest than last day of next month ([0d01405](https://github.com/react-toolbox/react-toolbox/commit/0d01405))
              * Latest build 🤖 ([fccf6f5](https://github.com/react-toolbox/react-toolbox/commit/fccf6f5))
              * Made property for both topbottom and leftright padding of day on calendar picker. Fixes IE11 bug ([cb138fc](https://github.com/react-toolbox/react-toolbox/commit/cb138fc))
              * Replace react-toolbox.d.ts with index.d.ts ([235d914](https://github.com/react-toolbox/react-toolbox/commit/235d914))
              * Update libs with new external .d.ts files ([9856ca0](https://github.com/react-toolbox/react-toolbox/commit/9856ca0))
              * Update TypeScript definition section of README.md ([deb3630](https://github.com/react-toolbox/react-toolbox/commit/deb3630))
              * Update typings to external modules (no more 'declare module ...') to get the definitions working aut ([f8c1a3f](https://github.com/react-toolbox/react-toolbox/commit/f8c1a3f))
              * chore(eslint): fix propTypes order ([d06dd78](https://github.com/react-toolbox/react-toolbox/commit/d06dd78))
              * feat(dropdown): add support for name prop ([ec94e5a](https://github.com/react-toolbox/react-toolbox/commit/ec94e5a))

              <a name="0.14.1"></a>
              ## 0.14.1 (2016-01-26)

              * 0.14.1 release ([b736a5f](https://github.com/react-toolbox/react-toolbox/commit/b736a5f))
              * Add babel standalone for the playground live editor ([0037210](https://github.com/react-toolbox/react-toolbox/commit/0037210))
              * Add missing semicolons ([6eb5838](https://github.com/react-toolbox/react-toolbox/commit/6eb5838))
              * Add TypeScript definition file and typings entry to package.json, as well as a blurb in README.md ([d7b6c6b](https://github.com/react-toolbox/react-toolbox/commit/d7b6c6b))
              * Allow Link to render Tooltips via children prop ([9da2378](https://github.com/react-toolbox/react-toolbox/commit/9da2378))
              * allow passing components to card title and subtitle ([08c0907](https://github.com/react-toolbox/react-toolbox/commit/08c0907))
              * Bebel 6 Integrated, Stage-0 added, React updated ([f6047f8](https://github.com/react-toolbox/react-toolbox/commit/f6047f8))
              * close dropdown when click event is triggered outside the component ([21a6860](https://github.com/react-toolbox/react-toolbox/commit/21a6860))
              * Enable Element to behave as Icon ([998b5a4](https://github.com/react-toolbox/react-toolbox/commit/998b5a4))
              * Enabling passing components as icons in all the components ([80b5b7a](https://github.com/react-toolbox/react-toolbox/commit/80b5b7a))
              * Everything but toolbox-loader has been updated ([bbce96c](https://github.com/react-toolbox/react-toolbox/commit/bbce96c))
              * export raw components ([678bd81](https://github.com/react-toolbox/react-toolbox/commit/678bd81))
              * Fix state changes in slider spec example ([30c277b](https://github.com/react-toolbox/react-toolbox/commit/30c277b))
              * Fixe autocomplete ([3c6b7af](https://github.com/react-toolbox/react-toolbox/commit/3c6b7af))
              * fixed button test ([485be5e](https://github.com/react-toolbox/react-toolbox/commit/485be5e))
              * Fixed linting issues ([7c27b09](https://github.com/react-toolbox/react-toolbox/commit/7c27b09))
              * Fixes #270 ([f16934c](https://github.com/react-toolbox/react-toolbox/commit/f16934c)), closes [#270](https://github.com/react-toolbox/react-toolbox/issues/270)
              * Fixes for autocomplete and tests ([f0d5f19](https://github.com/react-toolbox/react-toolbox/commit/f0d5f19))
              * fixing a typo for the List component ([3b3beaf](https://github.com/react-toolbox/react-toolbox/commit/3b3beaf))
              * propagate events in Button ([8dad57e](https://github.com/react-toolbox/react-toolbox/commit/8dad57e))
              * propagate events in Dropdown ([9ce68ae](https://github.com/react-toolbox/react-toolbox/commit/9ce68ae))
              * propagate events in IconMenu ([d92350f](https://github.com/react-toolbox/react-toolbox/commit/d92350f))
              * propagate events in Tab ([0a94499](https://github.com/react-toolbox/react-toolbox/commit/0a94499))
              * propagate events in Tooltip ([a11d152](https://github.com/react-toolbox/react-toolbox/commit/a11d152))
              * removed unused checkbox validations ([39c7c61](https://github.com/react-toolbox/react-toolbox/commit/39c7c61))
              * Removing event from dropdown when not active anymore ([160fb47](https://github.com/react-toolbox/react-toolbox/commit/160fb47))
              * Replace transition-property to transition for Issue#230 ([25a9e65](https://github.com/react-toolbox/react-toolbox/commit/25a9e65))
              * retracted unnecessary addition ([20e41fb](https://github.com/react-toolbox/react-toolbox/commit/20e41fb))
              * update avatar example to use `image` instead of `img` property ([0e60fd2](https://github.com/react-toolbox/react-toolbox/commit/0e60fd2))
              * Upgrading the rest of the dependencies ([c044a22](https://github.com/react-toolbox/react-toolbox/commit/c044a22))
            </p>
            <DialogChild />
          </Dialog>
        </ContextComponent>
      </section>
    );
  }
}

class ContextComponent extends React.Component {
  static propTypes = {
    children: PropTypes.any
  };

  static childContextTypes = {
    message: PropTypes.string
  }

  getChildContext () {
    return {
      message: 'Hi, I\'m the top container'
    };
  }

  render () {
    return this.props.children;
  }
}

class DialogChild extends React.Component {
  static contextTypes = {
    message: PropTypes.string
  }

  render () {
    return <p>This message comes from a parent: <strong>{this.context.message}</strong></p>;
  }
}

export default DialogTest;
