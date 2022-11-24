import React, { useEffect } from 'react'
import api from '../api'
import { getProfile } from '../actions'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile)
  
  useEffect(() => {
    if (!profile.user) return
    navigate('/profile')
  }, [profile])

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('http://localhost:5001/login', {email, password })
  
      localStorage.setItem('session', JSON.stringify({accessToken: response.data.accessToken, refreshToken: response.data.refreshToken}))

      const res = await api.get('http://localhost:5000/profile')
  
      dispatch(getProfile(res.data))

      navigate('/profile')
    } catch (error) { console.log(error) }
  };

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input type='email' name='email' value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)} required/>
        <input type='password' name='pass' value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} required/>
        <input type='submit' />
      </form>
    </>
  )
}

export default Login