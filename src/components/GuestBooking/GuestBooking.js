import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { makeStyles } from '@mui/styles';
import '../../assets/style.css'
import moment from 'moment';

export default function GuestBooking() {
    const [bookRoom, setBookRoom] = React.useState(false);
    const classes = useStyles();
    const [state, setState] = React.useState({data: {arrival_date: moment().format('YYYY-MM-DD')}});

    function handleInputChange(e) {
        const { name, value } = e.target;
        setState({
            ...state,
            data: {
                ...state.data,
                [name]: value
            }
        });
    }

    function handleBookRoom(){
        setBookRoom(!bookRoom);
    }

    console.log("lqlqlq", state.data)
  return (
    <>
    {
        bookRoom ?
        <>
            <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
            {/* <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
            >
                <Toolbar>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                    <SearchIcon color="inherit" sx={{ display: 'block' }} />
                    </Grid>
                    <Grid item xs>
                    <TextField
                        fullWidth
                        placeholder="Search by email address, phone number, or user UID"
                        InputProps={{
                        disableUnderline: true,
                        sx: { fontSize: 'default' },
                        }}
                        variant="standard"
                    />
                    </Grid>
                    <Grid item>
                    <Button variant="contained" sx={{ mr: 1 }} onClick={handleBookRoom}>
                        Cancel
                    </Button>
                    <Tooltip title="Reload">
                        <IconButton>
                        <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                        </IconButton>
                    </Tooltip>
                    </Grid>
                </Grid>
                </Toolbar>
            </AppBar> */}
            <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                <Grid container spacing="3">
                    <Grid item lg={12}>
                        <div className="d-flex align-center space-between">
                            <span>
                                <label className={classes.InputLabel}>
                                    Full Name
                                    <span style={{color : 'red'}}>*</span>
                                </label>
                            </span>
                        </div>
                        <input type="text" name="full_name" onChange={handleInputChange} placeholder="Enter your full name" mandatory />
                    </Grid>
                    <Grid item lg={6}>
                        <div className="d-flex align-center space-between">
                            <span>
                                <label className={classes.InputLabel}>
                                    Arrival Time
                                    <span style={{color : 'red'}}>*</span>
                                </label>
                            </span>
                        </div>
                        <input type="time" name="arrival_time" onChange={handleInputChange} placeholder="Select Arrival time" mandatory />
                    </Grid>
                    <Grid item lg={6}>
                        <div className="d-flex align-center space-between">
                            <span>
                                <label className={classes.InputLabel}>
                                    Type of Room Required
                                    <span style={{color : 'red'}}>*</span>
                                </label>
                            </span>
                        </div>
                        <select name="room_Type" id="room_type" className="select" name="room_type" onChange={handleInputChange} placeholder="Select Room Type" mandatory>
                            <option value="non_ac_single">NON AC Single</option>
                            <option value="non_ac_double">NON AC Double</option>
                            <option value="ac_single">AC Single</option>
                            <option value="ac_double">AC Double</option>
                        </select>
                    </Grid>
                    <Grid item lg={12}>
                        <div className="d-flex align-center space-between">
                            <span>
                                <label className={classes.InputLabel}>
                                    Advance Paid
                                    <span style={{color : 'red'}}>*</span>
                                </label>
                            </span>
                        </div>
                        <input type="text" name="advance_paid" onChange={handleInputChange} placeholder="Advance Amount Paid (If any)" mandatory />
                    </Grid>
                    <Grid item lg={12}>
                        <div className="d-flex align-center space-between">
                            <span>
                                <label className={classes.InputLabel}>
                                    Days of Stay
                                    <span style={{color : 'red'}}>*</span>
                                </label>
                            </span>
                        </div>
                        <input type="text" name="stay_days" onChange={handleInputChange} placeholder="Number of Days of stay" mandatory />
                    </Grid>
                    <Grid item lg={12}>
                        <div className="d-flex align-center space-between">
                            <span>
                                <label className={classes.InputLabel}>
                                    Date of Arrival
                                    <span style={{color : 'red'}}>*</span>
                                </label>
                            </span>
                        </div>
                        <input type="text" name="arrival_date" onChange={handleInputChange} value={state.data.arrival_date} mandatory disabled />
                    </Grid>
                    <Grid item lg={12}>
                        <div className="d-flex align-center space-between mt-10">
                            <button className="btn btn-outline-grey" onClick={handleBookRoom}>Cancel</button>
                            <button className="btn btn-submit">Submit</button>
                        </div> 
                    </Grid>
                </Grid>
            </Typography>
            </Paper>
        </>
        :
        <>
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
            >
                <Toolbar>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                    <SearchIcon color="inherit" sx={{ display: 'block' }} />
                    </Grid>
                    <Grid item xs>
                    <TextField
                        fullWidth
                        placeholder="Search by email address, phone number, or user UID"
                        InputProps={{
                        disableUnderline: true,
                        sx: { fontSize: 'default' },
                        }}
                        variant="standard"
                    />
                    </Grid>
                    <Grid item>
                    <Button variant="contained" sx={{ mr: 1 }} onClick={handleBookRoom}>
                        Book a Room
                    </Button>
                    <Tooltip title="Reload">
                        <IconButton>
                        <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                        </IconButton>
                    </Tooltip>
                    </Grid>
                </Grid>
                </Toolbar>
            </AppBar>
            <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                No Bookings Yet
            </Typography>
            </Paper>
        </>
    }
    </>
  );
}


const useStyles = makeStyles(theme => ({
    root: {
        margin: '140px 400px',
        '& .MuiButtonBase-root':{
            padding: '11px',
            backgroundColor: '#228DC1',
            color: '#fff'
        },
        '& .mt-25':{
            marginTop: '25px'
        }
    },
    InputLabel:{
        fontSize: '12px',
        fontWeight:400,
        color:'#828282'
    },
}));