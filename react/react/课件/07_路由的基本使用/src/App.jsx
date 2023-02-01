import { Component } from 'react';
import { HashRouter, Link, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <HashRouter>
                    <div className="row">
                        <div className="col-8">
                            <div className="page-header">
                                <h2>React Router Demo</h2>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-4">
                            <div className="list-group">
                                <Link className="list-group-item" to="/home">Home</Link>
                                <Link className="list-group-item" to="/about">About</Link>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="panel">
                                <div className="panel-body">
                                    <Route path="/home" component={Home}></Route>
                                    <Route path="/about" component={About}></Route>
                                </div>
                            </div>
                        </div>
                    </div>
                </HashRouter>
            </div>
        )
    }
}
