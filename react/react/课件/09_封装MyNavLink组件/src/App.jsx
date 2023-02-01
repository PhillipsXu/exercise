import { Component } from 'react';
import { Route } from 'react-router-dom';
import MyNavLink from './components/MyNavLink';
import Title from './components/Title';
import Home from './pages/Home';
import About from './pages/About';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <Title />
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-4">
                        <div className="list-group">
                            {
                                this.state.linkList.map((e, index) => {
                                    return <MyNavLink {...e} key={index} />
                                })
                            }
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
            </div>
        )
    }

    state = {
        linkList: [
            {
                to: '/home',
                children: 'Home'
            },
            {
                to: '/about',
                children: 'About'
            }
        ]
    }
}
