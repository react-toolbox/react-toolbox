/* global React */

// import Autocomplete from './components/autocomplete';
import Button from './components/button';
import Card from './components/card';
import Checkbox from './components/checkbox';
import Dialog from './components/dialog';
import Drawer from './components/drawer';
import RadioGroup from './components/radio_group';
// import Card from './components/card';
// import Dialog from './components/dialog';
// import Dropdown from './components/dropdown';
// import FontIcon from './components/font_icon';
// import Form from './components/form';
// import Progress from './components/progress';
// import Slider from './components/slider';
// import Switch from './components/switch';
// import Pickers from './components/pickers';
// import Tabs from './components/tabs';

const Test = React.createClass({
  displayName: 'App',

  render () {
    return (
      <app data-react-toolbox-app>
        <h4>React Toolbox component spec</h4>
        <Button />
        <Card />
        <Checkbox />
        <Dialog />
        <Drawer />
        <RadioGroup />
      </app>
    );
  }
});

React.render(<Test/>, document.body);
