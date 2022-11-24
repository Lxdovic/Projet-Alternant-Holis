import React, { useState, useEffect } from 'react'
import { Box, Avatar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import AccountAccordion from './AccountAccordion.jsx'
import MenuAccordion from './MenuAccordion.jsx'

const Navbar = () => {
    const profile = useSelector(state => state.profile)
    const [expanded, setExpanded] = useState(false);
    const handleChange = (isExpanded, panel) => {
        setExpanded(isExpanded ? panel : false);
    };

    const b64 = btoa( profile?.user?.profile_picture?.data.reduce((data, byte) => data + String.fromCharCode(byte), ''));

    return (
        <Box sx={{
            width: 240,
            height: '100vh',
            backgroundColor: '#282136',
            borderRight: "1px solid #4452FF",
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                height: 100, backgroundColor: "#282136", borderBottom: '1px solid #3A2D56'
            }}>

                <Avatar alt="Avatar" src={profile?.user ? 'data:image/gif;base64, ' + b64 : ''} />
                
                <Box sx={{
                    width: 150,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Typography noWrap sx={{ color: '#fff' }}>
                        {profile?.user?.username || 'Guest'}
                    </Typography>

                    <Typography noWrap sx={{ color: '#C2C2C2' }} color='text.secondary'>
                        {profile?.user?.email || ''}
                    </Typography>
                </Box>
            </Box>

            <AccountAccordion
                expanded={expanded === 0}
                onChange={(event, isExpanded) => handleChange(isExpanded, 0)}>
            </AccountAccordion>

            <MenuAccordion 
                expanded={expanded === 1}
                onChange={(event, isExpanded) => handleChange(isExpanded, 1)}>
            </MenuAccordion>
        </Box>
    );
}

export default Navbar