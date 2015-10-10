/* global React */

import Autocomplete from './components/autocomplete';
import Button from './components/button';
import Card from './components/card';
import Checkbox from './components/checkbox';
import Dialog from './components/dialog';
import Drawer from './components/drawer';
import Dropdown from './components/dropdown';
import Input from './components/input';
import Progress from './components/progress';
import RadioGroup from './components/radio_group';
import Slider from './components/slider';
import Switch from './components/switch';
// import FontIcon from './components/font_icon';
// import Form from './components/form';
// import Pickers from './components/pickers';
// import Tabs from './components/tabs';

const Test = React.createClass({
  displayName: 'App',

  render () {
    return (
      <app data-react-toolbox-app>
        <h1>React Toolbox</h1>
        <h3>Component Spec v0.10.9</h3>
        <Autocomplete />
        <Button />
        <Card />
        <Checkbox />
        <Dialog />
        <Drawer />
        <Dropdown />
        <Input />
        <Progress />
        <RadioGroup />
        <Slider />
        <Switch />
      </app>
    );
  }
});


React.render(<Test/>, document.body);
