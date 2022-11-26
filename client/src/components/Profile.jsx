import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Paper, Typography, Avatar, IconButton, Divider, Tooltip } from '@mui/material'
import { Edit } from '@mui/icons-material'

const Profile = () => {
  const navigate = useNavigate();
  const profile = useSelector(state => state.profile)
  const b64 = btoa( profile?.user?.profile_picture?.data.reduce((data, byte) => data + String.fromCharCode(byte), ''));

  const handleClick = () => {
    navigate('/profile_update')
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', height: 300 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar sx={{ width: 220, height: 220 }} alt='Avatar' src={profile?.user?.profile_picture ? 'data:image/gif;base64, ' + b64 : 'pfp.svg'} />

              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'end', gap: 1 }}>
                <Typography variant='h5' sx={{ color: '#fff' }}>{profile.user.username}</Typography>
                <Typography sx={{ color: '#C2C2C2' }}>{profile.user.email}</Typography>
              </Box>
            </Box>

            <Tooltip title='Edit'>
              <IconButton onClick={handleClick} sx={{ width: 50, height: 50, backgroundColor: '#4452FF' }} aria-label='settings'><Edit style={{ color: '#C2C2C2'}} /></IconButton>
            </Tooltip>
          </Box>
          
          <Divider sx={{ borderColor: '#3A2D56' }} />

          <Box sx={{ display: 'flex', height: '100%', justifyContent: 'space-between', alignItems: 'center', gap: 3 }}>
            <Typography sx={{ color: '#C2C2C2' }}>{profile.user.bio || 'Add a biography'}</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default Profile