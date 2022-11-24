import React from 'react'
import { useSelector } from 'react-redux'
import { Accordion, AccordionSummary, AccordionDetails, ListItemButton, List, ListItemIcon, ListItemText } from '@mui/material';
import { ExpandMore, Login, Logout, HowToReg, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AccountAccordion = (props) => {
    const navigate = useNavigate();
    const profile = useSelector(state => state.profile)

    return (
        <Accordion
            expanded={props.expanded}
            onChange={props.onChange}
            disableGutters={true}
            square={true}
            style={{ boxShadow: "none", padding: 0, backgroundColor: "#282136", borderBottom: '1px solid #3A2D56' }}
        >
            <AccordionSummary sx={{ color: '#fff' }} expandIcon={<ExpandMore style={{ color: '#C2C2C2'}} />}>
                Account
            </AccordionSummary>

            <AccordionDetails
                style={{ padding: "0 10px" }}>
                <List component="nav" aria-label="main mailbox folders">
                    {profile.user ? (
                        <>
                            <ListItemButton 
                                onClick={() => navigate('/profile')}
                                key={0}
                                sx={{
                                    height: 38,
                                    borderRadius: 1,
                                }}
                            >
                                <ListItemIcon>{<Person style={{ color: '#C2C2C2'}}/>}</ListItemIcon>
                                <ListItemText sx={{ color: '#fff' }} primary="Profile" />
                            </ListItemButton>

                            <ListItemButton 
                                onClick={() => navigate('/logout')}
                                key={1}
                                sx={{
                                    height: 38,
                                    borderRadius: 1,
                                }}
                            >
                                <ListItemIcon>{<Logout style={{ color: '#C2C2C2'}}/>}</ListItemIcon>
                                <ListItemText sx={{ color: '#fff' }} primary="Logout" />
                            </ListItemButton>
                        </>
                    ) : (
                        <>
                            <ListItemButton 
                                onClick={() => navigate('/login')}
                                key={0}
                                sx={{
                                    height: 38,
                                    borderRadius: 1,
                                }}
                            >
                                <ListItemIcon>{<Login style={{ color: '#C2C2C2'}}/>}</ListItemIcon>
                                <ListItemText sx={{ color: '#fff' }} primary="Login" />
                            </ListItemButton>

                            <ListItemButton 
                                onClick={() => navigate('/register')}
                                key={1}
                                sx={{
                                    height: 38,
                                    borderRadius: 1,
                                }}
                            >
                                <ListItemIcon>{<HowToReg style={{ color: '#C2C2C2'}}/>}</ListItemIcon>
                                <ListItemText sx={{ color: '#fff' }} primary="Register" />
                            </ListItemButton>
                        </>
                    )}
                    
                </List>
            </AccordionDetails>
        </Accordion>
    )
}

export default AccountAccordion