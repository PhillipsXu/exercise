import { Component, lazy, Suspense } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Loading from './Loading';
import img from './Loading/loading.webp';
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));

export default class Demo extends Component {
    render() {
        return (
            <div>
                <Link to="/home">Home</Link>
                <br />
                <Link to="/about">About</Link>
                <hr />
                <Suspense fallback={<Loading src={img} />}>
                    <Switch>
                        <Route path="/home" component={Home}></Route>
                        <Route path="/about" component={About}></Route>
                    </Switch>
                </Suspense>
            </div>
        )
    }
}
