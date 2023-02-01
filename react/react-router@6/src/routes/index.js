import { Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import News from '../pages/About/News';
import Messages from '../pages/About/Messages';
import Details from '../pages/About/Messages/Details';

const routes = [
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/about',
        element: <About />,
        children: [
            {
                path: 'news',
                element: <News />
            },
            {
                path: 'messages',
                element: <Messages />,
                children: [
                    {
                        // path: 'details/:content', params传参
                        // search传参
                        path: 'details',
                        element: <Details />
                    }
                ]
            }
        ]
    },
    {
        path: '/',
        element: <Navigate to="/home" />
    }
]

export default routes;