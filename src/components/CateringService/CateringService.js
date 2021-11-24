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
import Checkbox from '@mui/material/Checkbox';
import { TableCell, TableBody, TableRow } from '@mui/material';
import { Table, TableContainer, TableHead } from '@mui/material';

export default function CateringService() {
    const [orderFood, setOrderFood] = React.useState(false);
    const [state, setState] = React.useState({data: {}});
    const classes = useStyles();

    React.useEffect(() => {
        fetch('http://127.0.0.1:8000/api/cateringorders/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
        .then(data => {
            setState(new_state => ({
                ...new_state,
                data:{
                    ...new_state.data,
                    order_list: data
                }
            }))
        })
    }, [])

    function handleBookRoom(){
        fetch("http://127.0.0.1:8000/api/guests/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
        .then(data => {
            setState(new_state => ({
                ...new_state,
                data:{
                    ...new_state.data,
                    guest_list: data
                }
            }))
        })
        setOrderFood(!orderFood);
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        console.log("lqlqlq", e.target.type)
        const checked = e.target.checked;
        if(e.target.name === "breakfast" || e.target.name === "lunch" || e.target.name === "dinner" || e.target.name === "snacks"){
            setState({
                ...state,
                data: {
                    ...state.data,
                    [name]: checked,
                    }
                }
            );
        } else {
            setState({
                ...state,
                data: {
                    ...state.data,
                    [name]: value
                }
            });
        }
    }

    function handleSubmit(){
        fetch("http://127.0.0.1:8000/api/cateringorders/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                breakfast_quantity: state.data.breakfast ? state.data.breakfast_quantity : 0,
                dinner_quantity: state.data.dinner ? state.data.dinner_quantity : 0,
                lunch_quantity: state.data.lunch ? state.data.lunch_quantity : 0,
                snacks_quantity: state.data.snacks ? state.data.snacks_quantity : 0,
                guest: state.data.guest
            })
        }).then(res => {
            console.log("Success")
            window.location.reload();
        })
        .catch(err => console.log(err))
    }

  return (
    <>
    {
        orderFood ?
        <>
            <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
            <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                <h2 style={{marginBottom:"20px"}}>Order Your Food</h2>
                <Grid container spacing="3">
                    <Grid item lg={6}>
                        <div className="d-flex align-center space-between">
                            <span>
                                <label className={classes.InputLabel}>
                                    Guest
                                    <span style={{color : 'red'}}>*</span>
                                </label>
                            </span>
                        </div>
                        <select name="guest" id="guest" className="select" onChange={handleInputChange} mandatory>
                            <option key={0} value="null">Please Select</option>
                            {
                                state.data.guest_list && state.data.guest_list.map((guest, index) => {
                                    return (
                                        <option key={index} value={guest.id}>{guest.name}</option>
                                    )
                                })
                            }
                        </select>
                    </Grid>
                    <Grid item lg={6}>
                        <div className="d-flex align-center space-between">
                            <span>
                                <label className={classes.InputLabel}>
                                    Food Type
                                    <span style={{color : 'red'}}>*</span>
                                </label>
                            </span>
                        </div>
                        <div className="d-flex align-center mr-5" style={{display: "inline-block", float: "left"}}>
                            <Checkbox
                            checked={state.data.breakfast || false} 
                            onChange={handleInputChange}
                            name="breakfast"
                            inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <div className="d-flex space-between" style={{display: "inline-block"}}>
                                <span>
                                    <label className={classes.InputLabel}>
                                    Breakfast
                                    </label>
                                </span>
                            </div>
                        </div>
                        <div className="d-flex align-center mr-5" style={{display: "inline-block", float: "left"}}>
                            <Checkbox
                            checked={state.data.lunch || false}
                            onChange={handleInputChange}
                            name="lunch"
                            inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <div className="d-flex space-between" style={{display: "inline-block"}}>
                                <span>
                                    <label className={classes.InputLabel}>
                                   Lunch
                                    </label>
                                </span>
                            </div>
                        </div>
                        <div className="d-flex align-center mr-5" style={{display: "inline-block", float: "left"}}>
                            <Checkbox
                            checked={state.data.dinner || false}
                            onChange={handleInputChange}
                            name="dinner"
                            inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <div className="d-flex space-between" style={{display: "inline-block"}}>
                                <span>
                                    <label className={classes.InputLabel}>
                                    Dinner
                                    </label>
                                </span>
                            </div>
                        </div>
                        <div className="d-flex align-center mr-5" style={{display: "inline-block", float: "left"}}>
                            <Checkbox
                            checked={state.data.snacks || false}
                            onChange={handleInputChange}
                            name="snacks"
                            inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <div className="d-flex space-between" style={{display: "inline-block"}}>
                                <span>
                                    <label className={classes.InputLabel}>
                                    Snacks
                                    </label>
                                </span>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={12}>
                        <div className="d-flex align-center space-between">
                            <span>
                                <label className={classes.InputLabel}>
                                    Breakfast Quantity
                                    <span style={{color : 'red'}}>*</span>
                                </label>
                            </span>
                        </div>
                        <input type="number" min="0" name="breakfast_quantity" onChange={handleInputChange} mandatory disabled={!state.data.breakfast ? true : false} />
                    </Grid>
                    <Grid item lg={12}>
                        <div className="d-flex align-center space-between">
                            <span>
                                <label className={classes.InputLabel}>
                                    Lunch Quantity
                                    <span style={{color : 'red'}}>*</span>
                                </label>
                            </span>
                        </div>
                        <input type="number" min="0" name="lunch_quantity" onChange={handleInputChange} mandatory disabled={!state.data.lunch ? true : false} />
                    </Grid>
                    <Grid item lg={12}>
                        <div className="d-flex align-center space-between">
                            <span>
                                <label className={classes.InputLabel}>
                                   Dinner Quantity
                                    <span style={{color : 'red'}}>*</span>
                                </label>
                            </span>
                        </div>
                        <input type="number" min="0" name="dinner_quantity" onChange={handleInputChange} mandatory disabled={!state.data.dinner ? true : false} />
                    </Grid>
                    <Grid item lg={12}>
                        <div className="d-flex align-center space-between">
                            <span>
                                <label className={classes.InputLabel}>
                                   Snacks Quantity
                                    <span style={{color : 'red'}}>*</span>
                                </label>
                            </span>
                        </div>
                        <input type="number" min="0" name="snacks_quantity" onChange={handleInputChange} mandatory disabled={!state.data.snacks ? true : false} />
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
                        Order Food
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
                    state.data.order_list && state.data.order_list.length > 0 ? 
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight: 'bold',fontSize:'18px'}}>Guest</TableCell>
                                <TableCell align="right" style={{fontWeight: 'bold',fontSize:'18px'}}>Breakfast</TableCell>
                                <TableCell align="right" style={{fontWeight: 'bold',fontSize:'18px'}}>Lunch</TableCell>
                                <TableCell align="right" style={{fontWeight: 'bold',fontSize:'18px'}}>Dinner</TableCell>
                                <TableCell align="right" style={{fontWeight: 'bold',fontSize:'18px'}}>Snacks</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    state.data.order_list && state.data.order_list.map((order) => {
                                        return(
                                            <TableRow
                                                key={order.guest}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                <TableCell component="th" scope="row">
                                                    {order.guest}
                                                </TableCell>
                                                <TableCell align="right">{order.breakfast_quantity}</TableCell>
                                                <TableCell align="right">{order.lunch_quantity}</TableCell>
                                                <TableCell align="right">{order.dinner_quantity}</TableCell>
                                                <TableCell align="right">{order.snacks_quantity}</TableCell>
                                                </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                        </TableContainer>
                    :
                    <span>No Orders Yet</span>
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