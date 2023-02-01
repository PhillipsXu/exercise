import { Component } from 'react';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import Title from './components/Title';
import Home from './pages/Home';
import About from './pages/About';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div className="row">
                        <div className="col-8">
                            <Title />
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-4">
                            <div className="list-group">
                                <NavLink activeClassName="active" className="list-group-item" to="/home">Home</NavLink>
                                <NavLink activeClassName="active" className="list-group-item" to="/about">About</NavLink>
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
                </BrowserRouter>
            </div>
        )
    }
}
