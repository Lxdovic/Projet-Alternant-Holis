import Login from '../components/Login';
import Logout from '../components/Logout';
import Register from '../components/Register';
import Profile from '../components/Profile';
import Home from '../components/Home';

const routes = [
    {
        path: '/',
        element: <Home />,
        displayText: 'Home',
    },

    {
        path: '/login',
        element: <Login />,
        displayText: 'Login',
    },

    {
        path: '/logout',
        element: <Logout />,
        displayText: 'Logout',
    },

    {
        path: '/register',
        element: <Register />,
        displayText: 'Register',
    },

    {
        path: '/profile',
        element: <Profile />,
        displayText: 'Profile',
    }
]

export default routes;