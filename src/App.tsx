import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CustomNavBar from './components/customNavBar/CustomNavBar';
import ChessDisplay from './components/chessDisplay/ChessDisplay';
import About from './components/about/about';

const App = () => (
  <>
    <Router>
      <CustomNavBar />
      <Switch>
        <Route path="/about/">
          <About />
        </Route>
        <Route path="/">
          <ChessDisplay />
        </Route>
      </Switch>
    </Router>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
