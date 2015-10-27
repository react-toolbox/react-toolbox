/*eslint-disable no-unused-vars*/
import React from 'react';
import commons from '../components/commons';
import style from './style';
import Autocomplete from './components/autocomplete';
import Button from './components/button';
import Card from './components/card';
import Checkbox from './components/checkbox';
import Dialog from './components/dialog';
import Drawer from './components/drawer';
import Dropdown from './components/dropdown';
import IconMenu from './components/icon_menu';
import Input from './components/input';
import List from './components/list';
import Menu from './components/menu';
import Pickers from './components/pickers';
import Progress from './components/progress';
import Radio from './components/radio';
import Snackbar from './components/snackbar';
import Slider from './components/slider';
import Switch from './components/switch';
import Tabs from './components/tabs';

const App = () => {
  return (
    <app className={`${commons.app} ${style.app}`}>
      <h1>React Toolbox</h1>
      <h3>Component Spec v0.10.20</h3>

      <Autocomplete />
      <Button />
      <Card />
      <Checkbox />
      <Dialog />
      <Drawer />
      <Dropdown />
      <IconMenu />
      <Input />
      <List />
      <Menu />
      <Pickers />
      <Progress />
      <Radio />
      <Slider />
      <Snackbar />
      <Switch />
      <Tabs />
    </app>
  );
};

export default App;
