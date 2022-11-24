import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Paper, Typography, Avatar, IconButton, Divider } from '@mui/material'
import { Edit } from '@mui/icons-material'

const Profile = () => {
  const profile = useSelector(state => state.profile)
  const b64 = btoa( profile?.user?.profile_picture?.data.reduce((data, byte) => data + String.fromCharCode(byte), ''));

  return (
    <>
      {profile?.user ? (
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
                  <Avatar sx={{ border: '1px solid #4452FF', width: 220, height: 220 }} alt='Avatar' src={profile?.user ? 'data:image/gif;base64, ' + b64 : ''} />

                  <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'end', gap: 1 }}>
                    <Typography variant='h5' sx={{ color: '#fff' }}>{profile.user.username}</Typography>
                    <Typography sx={{ color: '#C2C2C2' }}>{profile.user.email}</Typography>
                  </Box>
                </Box>

                <IconButton sx={{ width: 50, height: 50, backgroundColor: '#4452FF' }} aria-label='settings'><Edit style={{ color: '#C2C2C2'}} /></IconButton>
              </Box>
              
              <Divider sx={{ borderColor: '#3A2D56' }} />

              <Box sx={{ display: 'flex', height: '100%', justifyContent: 'space-between', alignItems: 'center', gap: 3 }}>
                <Typography sx={{ color: '#C2C2C2' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      ) : ('')}
    </>
  )
}

export default Profile