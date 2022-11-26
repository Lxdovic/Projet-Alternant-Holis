import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    navigate('/login')
    toast('Account verified!', { 
      type: 'default', 
      theme: 'dark', 
      style: { background: '#282136' }, 
      progressStyle: { background: '#4452FF', height: 2 } 
    })
  }, [])

  return;
}

export default Logout