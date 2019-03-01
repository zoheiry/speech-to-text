import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import createHistory from 'history/createBrowserHistory'


import { Theme as wardrobeTheme } from '@fashiontrade/wardrobe';

import Main from './pages/Main';
import Home from './pages/Home';
import Recordings from './pages/Recordings';
import Recording from './pages/Recording';
import Login from './pages/Login';
import Signup from './pages/Signup';

const history = createHistory()

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ThemeProvider theme={wardrobeTheme}>
          <div className="App">
            <Route path="/" component={Main} history={history}/>
            <Route exact path="/" component={Home} />
            <Route exact path="/recordings" component={Recordings} />
            <Route exact path="/recordings/:id" component={Recording} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </div>
        </ThemeProvider>
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);
