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

export default function CateringService() {
    const [orderFood, setOrderFood] = React.useState(false);
    const [state, setState] = React.useState({data: {}});
    const classes = useStyles();

    React.useEffect(() => {
        setState({data: {}});
    }, [])

    function handleBookRoom(){
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

  return (
    <>
    {
        orderFood ?
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
                                    Guest
                                    <span style={{color : 'red'}}>*</span>
                                </label>
                            </span>
                        </div>
                        <select name="guest" id="guest" className="select" onChange={handleInputChange} mandatory>
                            <option value="non_ac_single">asdasd</option>
                            <option value="non_ac_double">gdbdfve</option>
                            <option value="ac_single">wefwvwe</option>
                            <option value="ac_double">hntn</option>
                        </select>
                    </Grid>
                    <Grid item lg={12}>
                        <div className="d-flex align-center space-between">
                            <span>
                                <label className={classes.InputLabel}>
                                    Food Type
                                    <span style={{color : 'red'}}>*</span>
                                </label>
                            </span>
                        </div>
                        <div className="d-flex align-center" style={{display: "inline-block", float: "left"}}>
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
                        <div className="d-flex align-center" style={{display: "inline-block", float: "left"}}>
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
                        <div className="d-flex align-center" style={{display: "inline-block", float: "left"}}>
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
                        <div className="d-flex align-center" style={{display: "inline-block", float: "left"}}>
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
                No Orders Yet
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