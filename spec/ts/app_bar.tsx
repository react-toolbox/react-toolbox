import * as React from 'react';
import AppBar, {AppBar as NamedAppBar} from 'components/app_bar';

const AppBarTest: React.SFC<any> = () => (
  <section>
    <h5>AppBar</h5>
    <br />
    <AppBar title='Title' />
    <br />
    <AppBar leftIcon='menu' title='Title' />
    <br />
    <AppBar leftIcon='arrow_back' title='Title' rightIcon='close' />
    <br />
    <AppBar>
      Custom content
    </AppBar>
    <br/>
    <NamedAppBar title='NamedAppBar' />
  </section>
)

export default AppBarTest;
