import Login from '../components/Login';
import Logout from '../components/Logout';
import Register from '../components/Register';
import Profile from '../components/Profile';
import ProfileUpdate from '../components/ProfileUpdate';
import AccountVerified from '../components/AccountVerified';
import PasswordReset from '../components/PasswordReset';
import ChangePassword from '../components/ChangePassword';
import Home from '../components/Home';

const routes = [
    {
        path: '/',
        element: <Home />,
        displayText: 'Home'
    },

    {
        path: '/login',
        element: <Login />,
        displayText: 'Login'
    },

    {
        path: '/logout',
        element: <Logout />,
        displayText: 'Logout'
    },

    {
        path: '/register',
        element: <Register />,
        displayText: 'Register'
    },

    {
        path: '/profile',
        element: <Profile />,
        displayText: 'Profile'
    },

    {
        path: '/profile_update',
        element: <ProfileUpdate />,
        displayText: 'Profile Update'
    },

    {
        path: '/account_verified',
        element: <AccountVerified />,
        displayText: 'Account Verified'
    },

    {
        path: '/password_reset',
        element: <PasswordReset />,
        displayText: 'Reset password'
    },

    {
        path: '/change_password',
        element: <ChangePassword />,
        displayText: 'Change password'
    }
]

export default routes;