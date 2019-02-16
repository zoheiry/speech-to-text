import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Theme as wardrobeTheme } from '@fashiontrade/wardrobe';

import Main from './pages/Main';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ThemeProvider theme={wardrobeTheme}>
          <div className="App">
            <Route path="/" component={Main} />
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </div>
        </ThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
