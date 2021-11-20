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

export default function RoomPriceUpdate(){
    const [priceUpdateForm, openPriceUpdateForm] = React.useState(false);
    const [state, setState] = React.useState({data: {}});
    const classes = useStyles();

    function handlePriceUpdate(){
        openPriceUpdateForm(!priceUpdateForm);
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        console.log("lqlqlq", e.target.type)
        const checked = e.target.checked;
        if(e.target.name === "non_ac_single" || e.target.name === "non_ac_double" || e.target.name === "ac_singleCurrent Room " || e.target.name === "ac_double"){
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

    return(
        <>
    {
        priceUpdateForm ?
        <>
            <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
            <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                <h2 style={{marginBottom:"20px"}}>Update Room Price</h2>
                <Grid container spacing="3">
                    <Grid item lg={4}>
                        <div className="d-flex align-center mr-5" style={{display: "inline-block", float: "left"}}>
                            <Checkbox
                            checked={state.data.non_ac_single || false} 
                            onChange={handleInputChange}
                            name="non_ac_single"
                            inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <div className="d-flex space-between" style={{display: "inline-block"}}>
                                <span>
                                    <label className={classes.InputLabel}>
                                    Non AC Single 
                                    </label>
                                </span>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={8}>
                    <div className="d-flex align-center space-between">
                            <span>
                                <label className={classes.InputLabel}>
                                    Set New Price
                                    <span style={{color : 'red'}}>*</span>
                                </label>
                            </span>
                        </div>
                        <input type="number" min="0" name="nonac_single_price" onChange={handleInputChange} mandatory disabled={!state.data.non_ac_single ? true : false} />
                    </Grid>
                    <Grid item lg={4}>
                        <div className="d-flex align-center mr-5" style={{display: "inline-block", float: "left"}}>
                            <Checkbox
                            checked={state.data.non_ac_double || false} 
                            onChange={handleInputChange}
                            name="non_ac_double"
                            inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <div className="d-flex space-between" style={{display: "inline-block"}}>
                                <span>
                                    <label className={classes.InputLabel}>
                                    Non AC Double
                                    </label>
                                </span>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={8}>
                    <div className="d-flex align-center space-between">
                            <span>
                                <label className={classes.InputLabel}>
                                    Set New Price
                                    <span style={{color : 'red'}}>*</span>
                                </label>
                            </span>
                        </div>
                        <input type="number" min="0" name="nonac_double_price" onChange={handleInputChange} mandatory disabled={!state.data.non_ac_double ? true : false} />
                    </Grid>
                    <Grid item lg={4}>
                        <div className="d-flex align-center mr-5" style={{display: "inline-block", float: "left"}}>
                            <Checkbox
                            checked={state.data.ac_single || false} 
                            onChange={handleInputChange}
                            name="ac_single"
                            inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <div className="d-flex space-between" style={{display: "inline-block"}}>
                                <span>
                                    <label className={classes.InputLabel}>
                                    AC Single
                                    </label>
                                </span>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={8}>
                    <div className="d-flex align-center space-between">
                            <span>
                                <label className={classes.InputLabel}>
                                    Set New Price
                                    <span style={{color : 'red'}}>*</span>
                                </label>
                            </span>
                        </div>
                        <input type="number" min="0" name="ac_single_price" onChange={handleInputChange} mandatory disabled={!state.data.ac_single ? true : false} />
                    </Grid>
                    <Grid item lg={4}>
                        <div className="d-flex align-center mr-5" style={{display: "inline-block", float: "left"}}>
                            <Checkbox
                            checked={state.data.ac_double || false} 
                            onChange={handleInputChange}
                            name="ac_double"
                            inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <div className="d-flex space-between" style={{display: "inline-block"}}>
                                <span>
                                    <label className={classes.InputLabel}>
                                    AC Double
                                    </label>
                                </span>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={8}>
                    <div className="d-flex align-center space-between">
                            <span>
                                <label className={classes.InputLabel}>
                                    Set New Price
                                    <span style={{color : 'red'}}>*</span>
                                </label>
                            </span>
                        </div>
                        <input type="number" min="0" name="ac_double_price" onChange={handleInputChange} mandatory disabled={!state.data.ac_double ? true : false} />
                    </Grid>
                    
                    <Grid item lg={12}>
                        <div className="d-flex align-center space-between mt-10">
                            <button className="btn btn-outline-grey" onClick={handlePriceUpdate}>Cancel</button>
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
            <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                <h1 style={{marginBottom:"20px"}}>Current Room Price</h1>
                <Grid container spacing="3">
                    <Grid item lg={6} className="border-right border-bottom">
                        <div>
                        <div className="main-div">
                            <p className="main-heading">NON AC Single Room</p>
                            </div>
                        </div>
                        <div>
                        <div className="main-div">
                            <p className="main-heading">Rs 600</p>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={6} className="border-bottom">
                        <div>
                            <div className="main-div">
                                <p className="main-heading">NON AC Double Room</p>
                            </div>
                        </div>
                        <div>
                        <div className="main-div">
                            <p className="main-heading">Rs 800</p>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={6} className="border-right">
                        <div>
                        <div className="main-div">
                            <p className="main-heading">AC Single Room</p>
                            </div>
                        </div>
                        <div>
                        <div className="main-div">
                            <p className="main-heading">Rs 1200</p>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={6}>
                        <div>
                        <div className="main-div">
                            <p className="main-heading">AC Double Room</p>
                            </div>
                        </div>
                        <div>
                        <div className="main-div">
                            <p className="main-heading">Rs 1800</p>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={12} style={{marginTop: '20px'}}>
                        <div className="align-center space-between mt-10">
                            <button className="btn btn-submit" onClick={handlePriceUpdate}>Change Price</button>
                        </div> 
                    </Grid>
                </Grid>
            </Typography>
            </Paper>
        </>
    }
    </>
    )
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
