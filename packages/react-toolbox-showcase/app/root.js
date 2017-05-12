/* global VERSION */
import React, { Component, PropTypes } from 'react';
import { Switch, Redirect, Link, Route, withRouter } from 'react-router-dom';
import { Layout, Panel, NavDrawer } from 'react-toolbox/lib/layout';
import { AppBar } from 'react-toolbox/lib/app_bar';
import { Button } from 'react-toolbox/lib/button';
import Classic from './classic';
import StyledComponents from './styled-components';
import CSSModules from './css-modules';
import Fela from './fela';
import style from './style.css';

class Root extends Component {
  static propTypes = {
    listen: PropTypes.func,
  };

  state = {
    active: false,
  };

  componentDidMount() {
    this.props.listen(() => {
      this.setState({ active: false });
    });
  }

  handleSideBarToggle = () => {
    this.setState({ active: !this.state.active });
  };

  render() {
    const { active } = this.state;
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
          <Button
            className={style.github}
            href="http://react-toolbox.com/#/"
            target="_blank"
            icon="web"
            floating
            accent
          />
        </AppBar>

        <NavDrawer
          active={active}
          onEscKeyDown={this.handleSideBarToggle}
          onOverlayClick={this.handleSideBarToggle}
          permanentAt="lg"
        >
          <Link to="/"><div>Classic</div></Link>
          <Link to="/css-modules"><div>CSS Modules</div></Link>
          <Link to="/styled-components"><div>Styled Components</div></Link>
          <Link to="/fela"><div>Fela</div></Link>
        </NavDrawer>

        <Panel className={style.app}>
          <Switch>
            <Route exact path="/" render={Classic} />
            <Route exact path="/styled-components" render={StyledComponents} />
            <Route exact path="/css-modules" render={CSSModules} />
            <Route exact path="/fela" render={Fela} />
            <Route component={() => <Redirect to="/" />} />
          </Switch>
        </Panel>
      </Layout>
    );
  }
}

export default withRouter(Root);
