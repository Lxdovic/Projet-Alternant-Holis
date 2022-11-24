import React, { useEffect } from 'react'
import axios from 'axios';
import { getProfile } from '../actions'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile)
  
  useEffect(() => {
    if (!profile.user) return
    navigate('/profile')
  }, [profile])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    
    try {
      const response = await axios.post('http://localhost:5001/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log(response)

    } catch (error) { console.log(error) }
  };

  const handleFileSelect = (event) => {
    setImage(event.target.files[0])
  }

  return (
    <>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input type='email' name='email' value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)} required/>
        <input type='text' name='username' value={username} placeholder='username' onChange={(e) => setUsername(e.target.value)} required/>
        <input type='password' name='pass' value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} required/>
        <input type='file' onChange={handleFileSelect}/>
        <input type='submit' />
      </form>
    </>
  )
}

export default Register