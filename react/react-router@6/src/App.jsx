import React from 'react';
import { NavLink, useRoutes } from 'react-router-dom';
import routes from './routes';
import Header from './components/Header';

export default function App() {
    const activeClass = ({ isActive }) => {
        return isActive ? "list-group-item active" : "list-group-item"
    }

    const element = useRoutes(routes);

    return (
        <div className="container">
            <div className="row">
                <div className="col-8">
                    <Header />
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-4">
                    <div className="list-group">
                        <NavLink end className={activeClass} to="/home">Home</NavLink>
                        <NavLink className={activeClass} to="/about">About</NavLink>
                    </div>
                </div>
                <div className="col-8">
                    <div className="panel">
                        <div className="panel-body">
                            {/* <Routes>
                                <Route caseSensitive path="/home" element={<Home />} />
                                <Route caseSensitive path="/about" element={<About />} />
                                <Route path='/' element={<Navigate to="/home" />} />
                            </Routes> */}
                            {element}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
