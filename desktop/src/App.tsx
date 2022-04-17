import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/Store';
import MainWindow from './navigation/Main';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MainWindow />
      </Router>
    </Provider>
  );
}

export default App;
