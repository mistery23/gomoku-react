import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createStore } from 'redux'
import  rootRedusers  from "./reducers/index";

import Paths from './routing/routesPaths';
import Home from './Pages/Home'
import Game from './Pages/Game'

import './App.css';

class App extends Component {
  render() {
    
    const store = createStore(rootRedusers)
    return (
      <Provider store={store}>
        <Switch>
          <Route exact path={Paths.HOME} component={Home} />
          <Route path={Paths.GAME} component={Game} />
        </Switch>
      </Provider>
      );
    }
  }
  
  export default App;
