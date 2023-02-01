import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import './index.css';
import App from './App';
import store from './redux/store';

const app = ReactDOM.createRoot(document.getElementById('root'))
app.render(<App />);
store.subscribe(() => app.render(<App />));
