/* global VERSION */
import 'normalize.css';
import React, { Component } from 'react';

import { Layout, Panel, NavDrawer } from '../components/Layout';
import AppBar from '../components/AppBar';
import ButtonToolbox from '../components/Button';

import Autocomplete from './components/Autocomplete';
import AppBarTest from './components/AppBar';
import Avatar from './components/Avatar';
import FontIcon from './components/FontIcon';
import Button from './components/Button';
import Card from './components/Card';
import Checkbox from './components/Checkbox';
import Chip from './components/Chip';
import Dialog from './components/Dialog';
import Drawer from './components/Drawer';
import Dropdown from './components/Dropdown';
import IconMenu from './components/IconMenu';
import InputTest from './components/Input';
import List from './components/List';
import Menu from './components/Menu';
import Pickers from './components/Pickers';
import Progress from './components/Progress';
import Radio from './components/Radio';
import Slider from './components/Slider';
import Snackbar from './components/Snackbar';
import Switch from './components/Switch';
import Table from './components/Table';
import Tabs from './components/Tabs';
import Tooltip from './components/Tooltip';
import style from './style.css';

class Root extends Component {
  state = { pinned: false };

  handleSideBarToggle = () => {
    this.setState({ pinned: !this.state.pinned });
  };

  render() {
    return (
      <Layout>
        <AppBar
          title={`React Toolbox Spec ${VERSION}`}
          onLeftIconClick={this.handleSideBarToggle}
          className={style.appbar}
          leftIcon="menu"
          fixed
          flat
        >
          <ButtonToolbox
            className={style.github}
            href="http://react-toolbox.com/#/"
            target="_blank"
            icon="web"
            floating
            accent
          />
        </AppBar>

        <NavDrawer
          active={this.state.pinned}
          onEscKeyDown={this.handleSideBarToggle}
          onOverlayClick={this.handleSideBarToggle}
          permanentAt="lg"
        >
          This will content filter and indexes for examples
        </NavDrawer>

        <Panel className={style.app}>
          <Autocomplete />
          <AppBarTest />
          <Avatar />
          <FontIcon />
          <Button />
          <Card />
          <Checkbox />
          <Chip />
          <Dialog />
          <Drawer />
          <Dropdown />
          <IconMenu />
          <InputTest />
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
        </Panel>
      </Layout>
    );
  }
}

export default Root;
