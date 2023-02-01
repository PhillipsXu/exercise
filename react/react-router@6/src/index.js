import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

export const app = ReactDOM.createRoot(document.getElementById('root'));
app.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);