/* global VERSION */
import React from 'react';
import { ThemeProvider } from 'react-css-themr';
import theme from './theme';

import AppBarToolbox from '../components/app_bar';
import Avatar from './components/avatar';
import ButtonToolbox from '../components/button';
import Autocomplete from './components/autocomplete';
import Button from './components/button';
import Card from './components/card';
import Checkbox from './components/checkbox';
import Chip from './components/chip';
import Dialog from './components/dialog';
import Drawer from './components/drawer';
import Dropdown from './components/dropdown';
import IconMenu from './components/icon_menu';
import Input from './components/input';
import Layout from './components/layout';
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
import Tooltip from './components/tooltip';
import style from './style';

const Root = () => (
  <ThemeProvider theme={theme}>
    <div className={style.app}>
      <AppBarToolbox className={style.appbar} fixed flat>
        <h1>React Toolbox <small>Spec {VERSION}</small></h1>
        <ButtonToolbox
          accent
          className={style.github}
          icon='web'
          floating
          onClick={() => {window.href = 'http://react-toolbox';}}
        />
      </AppBarToolbox>

      <Autocomplete />
      <Avatar />
      <Button />
      <Card />
      <Checkbox />
      <Chip />
      <Dialog />
      <Drawer />
      <Dropdown />
      <IconMenu />
      <Input />
      <Layout />
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
      <Tooltip />
    </div>
  </ThemeProvider>
);

export default Root;
