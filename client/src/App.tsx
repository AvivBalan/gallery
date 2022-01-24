import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/layout';
import './App.css';

function App() {

  return (
    <>
      <div className="App">
        <HashRouter>
          <Switch>
            <Route path="/" component={Layout}/>
          </Switch>
        </HashRouter>
      </div>
    </>
  );
}

export default App;
