import logo from './logo.svg';
import './App.css';
import React from 'react';
import Hello from './components/Hello';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://react.docschina.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Hello />
        </header>
      </div>
    )
  }
}
