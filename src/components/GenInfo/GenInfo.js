import * as React from 'react';
import BedroomChildOutlinedIcon from '@mui/icons-material/BedroomChildOutlined';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export default function GenInfo() {
    return (
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
            <Typography sx={{ my: 5, mx: 2 }} color="text.secondary">
                <h2 style={{marginBottom:"20px"}}>Predefined Hotel facilities</h2>
                <ul>
                    <li style={{marginBottom:"2%"}}>Number of Rooms = 20</li>
                    <li style={{marginBottom:"2%"}}>Price increases when occupancy {'>'} 60%</li>
                    <li style={{marginBottom:"2%"}}>Price decreases when occupancy {'<'} 30%</li>
                    <li style={{marginBottom:"2%"}}>Breakfast:Rs 100</li>
                    <li style={{marginBottom:"2%"}}>Lunch:Rs 200</li>
                    <li style={{marginBottom:"2%"}}>Dinner:Rs 200</li>
                    <li style={{marginBottom:"2%"}}>Snacks:Rs 60</li>
                    <li style={{marginBottom:"2%"}}>Additional discount of 10% if guest booked more than 5 times</li>
                </ul>
            </Typography>
        </Paper>
    )
}
