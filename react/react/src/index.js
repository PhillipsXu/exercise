import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import App from './App';
import './index.css';

const app = ReactDOM.createRoot(document.querySelector('#root'));
app.render(
    <BrowserRouter>
        <ConfigProvider theme={{ token: { colorPrimary: '#ccc' } }}>
            <App />
        </ConfigProvider>
    </BrowserRouter>
)