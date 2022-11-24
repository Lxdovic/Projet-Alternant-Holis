import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './routes';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Box } from '@mui/material'
import Navbar from './components/Navbar/Navbar.jsx'
import { getProfile } from './actions'
import api from './api'

function App() {
  const profile = useSelector(state => state.profile)
  const dispatch = useDispatch()

  useEffect(() => {
    (async() => {

      if (!profile.user) {
        const response = await api.get('http://localhost:5000/profile')
    
        dispatch(getProfile(response.data))
      }

    })();
  }, [profile])

  return (
    <BrowserRouter>
      <Box sx={{ 
        display: 'flex',
        backgroundColor: '#221C2D',
      }}>
        <Navbar/>
        <Box sx={{
          width: 'calc(100vw - 240px)',
        }}>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element}/>
            ))}
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App
