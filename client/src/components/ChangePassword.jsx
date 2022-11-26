import React, { useEffect } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom';
import { TextField, Box, Paper, Button, Typography } from '@mui/material';
import { useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useState } from 'react'

const PasswordReset = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) { 
      return toast('Passwords do not match!', {
        type: 'default',
        theme: 'dark',
        style: { background: '#282136' },
        progressStyle: { background: '#4452FF', height: 2 }
      })
    }

    try {
      const response = await api.post('http://localhost:5001/change_password', { token: searchParams.get('token'), password: password });
    
      toast(response.data.message, {
        type: 'default', 
        theme: 'dark', 
        style: { background: '#282136' }, 
        progressStyle: { background: '#4452FF', height: 2 } 
      })

      navigate('/login')
    } catch (error) { 
      toast(error.response.data.message, {
        type: 'default', 
        theme: 'dark', 
        style: { background: '#282136' }, 
        progressStyle: { background: '#4452FF', height: 2 } 
      })
     }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        height: '100vh',
        width: '100%',
      }}
    >
      <Paper
        sx={{
          width: '50vw',
          height: 600,
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#282136',
          border: '1px solid #3A2D56',
          padding: 6,
          gap: 3,
        }}
      >
        <svg fill='rgba(0, 0, 0, .05' className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] pointer-events-none' viewBox='0 0 228.86 254.58'>
          <path d='M99.86,251.01c3.99,2.3,9.16,3.57,14.57,3.57s10.58-1.27,14.56-3.57l85.3-49.25c6.82-3.94,12.26-11.96,13.99-20.02-73.66,4.19-122.03,27.38-153.95,54.52l25.54,14.74Z'/>
          <path d='M214.29,52.81L128.99,3.57c-3.99-2.3-9.16-3.57-14.56-3.57s-10.58,1.27-14.57,3.57L14.57,52.81C6.26,57.61,0,68.45,0,78.04v98.5c0,9.59,6.26,20.43,14.57,25.23l6.59,3.81c74.65-37.22,159.22-35.72,207.7-30.49V78.04c0-9.59-6.26-20.43-14.57-25.23Zm-54.06,102.18H68.63v-47.59c0-1.06,1.17-3.1,2.1-3.63l41.61-24.02c.24-.14,.98-.4,2.1-.4s1.86,.26,2.1,.4l41.61,24.02c.92,.53,2.09,2.57,2.09,3.63v47.59Zm26.85,0h-13.38v-47.59c0-5.9-3.71-12.34-8.83-15.29l-41.61-24.02c-2.46-1.42-5.6-2.2-8.83-2.2s-6.37,.78-8.83,2.2l-41.6,24.02c-5.12,2.95-8.83,9.38-8.83,15.29v47.59h-13.38V90.99c0-2.85,2.42-7.04,4.89-8.47l62.87-36.3c1.15-.66,2.98-1.06,4.89-1.06s3.73,.4,4.89,1.06l62.87,36.3c2.46,1.43,4.89,5.62,4.89,8.47v64Zm28.31,0h-14.85V90.99c0-7.65-5-16.3-11.62-20.13l-62.87-36.3c-3.2-1.85-7.33-2.87-11.62-2.87s-8.42,1.02-11.62,2.87l-62.87,36.3c-6.62,3.83-11.62,12.48-11.62,20.13v64H13.47V78.04c0-4.73,3.73-11.2,7.83-13.56L106.6,15.23c1.94-1.12,4.8-1.77,7.83-1.77s5.89,.64,7.83,1.77l85.3,49.25c4.1,2.37,7.83,8.83,7.83,13.56v76.96Z'/>
        </svg>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: 3 }}>
            <Typography variant='h2' sx={{ color: 'white' }}>Change password</Typography>
            <TextField sx={{
              '& label': { color: '#C2C2C2', },
              '& label.Mui-focused': {color: '#C2C2C2' },
              '& .MuiFilledInput-underline': {
                '&:before': {  borderBottom: '1px solid #3A2D56'},
                '&:after': {  borderBottom: '1px solid #3A2D56'},
              }}} 
              
              InputProps={{ inputProps: { style: { color: '#fff' }}}} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              label='Password' 
              variant='filled'
              type='password'
              required
            />

            <TextField sx={{
              '& label': { color: '#C2C2C2', },
              '& label.Mui-focused': {color: '#3A2D56' },
              '& .MuiFilledInput-underline': {
                '&:before': {  borderBottom: '1px solid #3A2D56'},
                '&:after': {  borderBottom: '1px solid #3A2D56'},
              }}} 
              
              InputProps={{ inputProps: { style: { color: '#fff' }}}} 
              value={passwordConfirm} 
              onChange={(e) => setPasswordConfirm(e.target.value)} 
              label='Confirm password' 
              variant='filled'
              type='password'
              required
            />
          </Box>

            
          <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>      
            <Button sx={{ backgroundColor: '#4452FF', ":hover": { backgroundColor: '#3A2D56' }}} type='submit' variant='contained'>Send</Button>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default PasswordReset