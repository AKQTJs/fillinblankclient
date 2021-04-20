import React, { Component } from 'react';
import Main from './components/MainComponent';


import { DISHES } from './shared/dishes';

import './App.css';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();
/*
function App() {
  return (
    <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu />
      </div>
  );
}
*/


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  }

  render() {
    return (
      /*
            <div className="App">
              <Main />
            </div>
      */

      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>


    );
  }
}

export default App;
