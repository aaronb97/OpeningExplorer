import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';

import CustomNavBar from './components/customNavBar/CustomNavBar';
import ChessDisplay from './components/chessDisplay/ChessDisplay';

const App = () => (
  <>
    <CustomNavBar />
    <ChessDisplay />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
