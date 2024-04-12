import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CounterContextProvider } from './components/context';
import { Provider } from 'react-redux';
import store from './components/store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <CounterContextProvider>
      <App />
    </CounterContextProvider>
  </Provider>
);
