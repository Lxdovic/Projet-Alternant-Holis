import React, { useState } from 'react'
import api from '../api'
import { getProfile } from '../actions'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Paper, Avatar, IconButton, TextField, Tooltip } from '@mui/material'
import { Save, AddAPhoto } from '@mui/icons-material'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const profile = useSelector(state => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [bio, setBio] = useState(profile?.user?.bio);
  const [image, setImage] = useState('');
  const [username, setUsername] = useState(profile?.user?.username);
  const b64 = btoa( profile?.user?.profile_picture?.data.reduce((data, byte) => data + String.fromCharCode(byte), ''));
  console.log(profile)
  const handleSaveProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (!username || username.length < 3) { return toast('Username must be at least 3 characters long!', { type: 'default', theme: 'dark', style: { background: '#282136' }, progressStyle: { background: '#4452FF', height: 2 } }) }
    
    formData.append('image', image);
    formData.append('username', username);
    formData.append('bio', bio);

    const response = await api.post('http://localhost:5000/profile_update', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    if (response.status == 200) { 
      dispatch(getProfile(response.data))
      navigate('/profile')
      toast('Profile updated!', { 
        type: 'default', 
        theme: 'dark', 
        style: { background: '#282136' }, 
        progressStyle: { background: '#4452FF', height: 2 } 
      })
    }
  }
  
  const handleFileSelect = (event) => {
    setImage(event.target.files[0])

    let reader = new FileReader()

    reader.onload = (e) => { document.getElementById('avatar').children[0].src = e.target.result }
    reader.readAsDataURL(event.target.files[0])
  }

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
          backgroundColor: '#282136',
          border: '1px solid #3A2D56',
          padding: 6,
          gap: 3,
        }}
      >

        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', gap: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>

              <Tooltip title='Upload image'>
                <IconButton variant='contained' component='label'>
                  <Avatar id='avatar' sx={{ width: 100, height: 100 }} alt={profile?.user?.username || 'Guest'} src={profile?.user?.profile_picture ? 'data:image/gif;base64, ' + b64 : 'pfp.svg'}/>
                  <input type='file' hidden onChange={handleFileSelect} />
                  <AddAPhoto sx={{ position: 'absolute', fill: '#3A2D56AA' }}/>
                </IconButton>
              </Tooltip>
            </Box>

            <Tooltip title='Save'>
              <IconButton onClick={handleSaveProfile} sx={{ width: 50, height: 50, backgroundColor: '#4452FF' }} aria-label='settings'><Save style={{ color: '#C2C2C2'}} /></IconButton>
            </Tooltip>
          </Box>
          
          <TextField sx={{ 
            '& label': { color: '#C2C2C2', },
            '& label.Mui-focused': {color: '#C2C2C2' },
            '& .MuiFilledInput-underline': {
              '&:before': {  borderBottom: '1px solid #3A2D56'},
              '&:after': {  borderBottom: '1px solid #3A2D56'},
            }}} 
            
            InputProps={{ inputProps: { style: { color: '#fff' }}}} 
            value={username || ''} 
            onChange={(e) => setUsername(e.target.value)} 
            label='username' 
            variant='filled' 
            placeholder={profile?.user?.username}
          />

          <TextField sx={{
            '& label': { color: '#C2C2C2', },
            '& label.Mui-focused': {color: '#C2C2C2' },
            '& .MuiFilledInput-underline': {
              '&:before': {  borderBottom: '1px solid #3A2D56'},
              '&:after': {  borderBottom: '1px solid #3A2D56'},
            }}} 
            
            InputProps={{ inputProps: { style: { color: '#fff' }}}} 
            value={bio || ''} 
            onChange={(e) => setBio(e.target.value)} 
            multiline rows='10' 
            label='bio' 
            variant='filled' 
            placeholder={profile?.user?.bio}
          />
          
        </Box>
      </Paper>
    </Box>
  )
}

export default Profile