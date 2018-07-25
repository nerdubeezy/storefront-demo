import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import StoreFront from './components/store/store.js';

function App() {
  return (
    <BrowserRouter>
      <StoreFront />
    </BrowserRouter>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
