import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { createWallet, createKeystore, decryptKeystore, getBalance } from './scripts/wallet';
import logo from './logo.svg';
import './App.css';

import Bar from './components/bar';
import Home from './components/home';


class App extends Component {

  componentDidMount() {

    // let wallet = createWallet();
    // let keystore = createKeystore(wallet, 'myrandompassword');
    // let decrypted = decryptKeystore(keystore, 'myrandompassword');
    // console.log(decrypted);

    // console.log(getBalance('LfYKjjCJNnEFPYKHVnF8Wt52RkqaNgjjBr'));


  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Bar />
          <Home />

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
