import React from 'react';

import App from '../components/app';
import AppBarToolbox from '../components/app_bar';
import ButtonToolbox from '../components/button';

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
import Table from './components/table';
import Tabs from './components/tabs';

// import Logo from '../docs/app/components/logo'
import style from './style';

const _hrefProject = () => {
  window.href = 'http://react-toolbox';
};

const Root = () => (
  <App className={style.app}>
    <AppBarToolbox fixed flat className={style.app_bar}>
      <h1>React Toolbox <small>Spec 0.11.2</small></h1>
      <ButtonToolbox
        accent
        className={style.github}
        icon='web'
        kind='floating'
        onClick={_hrefProject}
      />
    </AppBarToolbox>

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
    <Table />
    <Tabs />
  </App>
);

export default Root;
