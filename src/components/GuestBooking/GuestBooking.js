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
import { TableCell, TableBody, TableRow } from '@mui/material';
import { Table, TableContainer, TableHead } from '@mui/material';
// import { Redirect } from 'react-router-dom';
// import { Redirect } from 'react-router';

export default function GuestBooking() {
    const [bookRoom, setBookRoom] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);
    const classes = useStyles();
    const [state, setState] = React.useState({error: false, data: {arrival_date: moment().format('YYYY-MM-DD'), arrival_time: moment().format("HH:mm")}});

    React.useEffect(() => {
        fetch("http://127.0.0.1:8000/api/roombooked/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                setState(new_state => ({
                    ...new_state,
                    data: {
                        ...new_state.data,
                        guest_list: data
                    }
                }));
            });
    }, [])

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
        setState(new_state => ({
            ...new_state,
            error: false
        }))
        setBookRoom(!bookRoom);
    }

    function handleSubmit(){
        console.log("post_data", state.data)
        fetch('http://127.0.0.1:8000/api/guests/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: state.data.full_name,
                duration: state.data.stay_days,
                advanced_paid: state.data.advance_paid,
                room_choices: state.data.room_type
            })
        }).then(
            res => res.json()
        ).then(data => {
            console.log("SUCCESS")
            setRedirect(true);
            window.location.reload();
        }
        ).catch(err=>{
            console.log("Error", err)
            setState(new_state => ({
                ...new_state,
                error: true
            }))
        })
    }

    console.log("lqlqlq", state.data)
  return (
    <>
    {
        // redirect ? <Redirect to="/" /> : null
        state.error ? window.alert("Unfortunately, No rooms are available of your choice. Please select another category of room.") : null
    }
    {
        bookRoom ?
        <>
            <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
            <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                <h2 style={{marginBottom:"20px"}}>Book a Room</h2>
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
                        <input type="time" name="arrival_time" onChange={handleInputChange} placeholder="Select Arrival time" value={state.data.arrival_time} mandatory />
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
                            <option value="null">Please Select</option>
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
                            <button className="btn btn-submit" onClick={handleSubmit}>Submit</button>
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
                {
                    state.data.guest_list && state.data.guest_list.length > 0 ?
                    <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell style={{fontWeight: 'bold',fontSize:'18px'}}>Guest name</TableCell>
                        <TableCell align="right" style={{fontWeight: 'bold',fontSize:'18px'}}>Room Number</TableCell>
                        <TableCell align="right" style={{fontWeight: 'bold',fontSize:'18px'}}>Unique Token Number</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            state.data.guest_list && state.data.guest_list.map((guest) => {
                                return(
                                    <TableRow
                                        key={guest.unique_token_number}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell component="th" scope="row">
                                            {guest.guest_name} 
                                        </TableCell>
                                        <TableCell align="right">{guest.room_number}</TableCell>
                                        <TableCell align="right">{guest.unique_token_number}</TableCell>
                                        </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
                </TableContainer>
                :
                <span>No Bookings Yet</span>
                }
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