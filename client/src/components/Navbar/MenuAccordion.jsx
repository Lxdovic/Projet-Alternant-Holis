import React from 'react'
import { useSelector } from 'react-redux'
import { Accordion, AccordionSummary, AccordionDetails, ListItemButton, List, ListItemIcon, ListItemText } from '@mui/material';
import { ExpandMore, Link, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AccountAccordion = (props) => {
    const navigate = useNavigate();

    return (
        <Accordion
            expanded={props.expanded}
            onChange={props.onChange}
            disableGutters={true}
            square={true}
            style={{ boxShadow: "none", padding: 0, backgroundColor: "#282136", borderBottom: '1px solid #3A2D56' }}
        >
            <AccordionSummary sx={{ color: '#fff' }} expandIcon={<ExpandMore style={{ color: '#C2C2C2'}} />}>
                Other
            </AccordionSummary>

            <AccordionDetails
                style={{ padding: "0 10px" }}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItemButton 
                        onClick={() => navigate('/')}
                        key={0}
                        sx={{
                            height: 38,
                            borderRadius: 1,
                        }}
                    >
                        <ListItemIcon>{<Link style={{ color: '#C2C2C2'}}/>}</ListItemIcon>
                        <ListItemText sx={{ color: '#fff' }} primary="Link" />
                    </ListItemButton>

                    <ListItemButton 
                        onClick={() => navigate('/')}
                        key={1}
                        sx={{
                            height: 38,
                            borderRadius: 1,
                        }}
                    >
                        <ListItemIcon>{<Link style={{ color: '#C2C2C2'}}/>}</ListItemIcon>
                        <ListItemText sx={{ color: '#fff' }} primary="Link" />
                    </ListItemButton>
                </List>
            </AccordionDetails>
        </Accordion>
    )
}

export default AccountAccordion