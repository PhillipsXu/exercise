import { Component } from 'react';
import { ErrorBoundary, Demo } from './components/8_Error Boundaries';
import { BrowserRouter } from 'react-router-dom';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <ErrorBoundary>
                    <Demo />
                </ErrorBoundary>
            </BrowserRouter>
        )
    }
}
