import React from 'react';
import ReactDOM from 'react-dom';
import history from './history';
import Docs from './docs';

ReactDOM.render(<Docs history={history}/>, document.getElementById('app'));
