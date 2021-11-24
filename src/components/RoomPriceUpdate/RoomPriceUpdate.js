import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import '../../assets/style.css'
import Checkbox from '@mui/material/Checkbox';

export default function RoomPriceUpdate(){
    const [priceUpdateForm, openPriceUpdateForm] = React.useState(false);
    const [state, setState] = React.useState({data: {room_type: 1}});
    const classes = useStyles();

    React.useEffect(() => {
        fetch('http://localhost:8000/api/roomcharges', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            setState(new_state => ({
                ...new_state,
                data:{
                    ...new_state.data,
                    roomCharges: data
                }
            }));
        })
        .catch(err => console.log(err));
    }, [])

    function handlePriceUpdate(){
        openPriceUpdateForm(!priceUpdateForm);
    }

    console.log("lqlqlq", state.data)

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

    function handleSubmit(){
        fetch(`http://localhost:8000/api/roomcharges/${state.data.room_type}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({room_charges: state.data.room_charges})
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            window.location.reload();
        })
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
                    <Grid item lg={12}>
                        <div className="d-flex align-center space-between">
                            <span>
                                <label className={classes.InputLabel}>
                                    Select Room Type
                                    <span style={{color : 'red'}}>*</span>
                                </label>
                            </span>
                        </div>
                        <select name="room_type" id="room_type" className="select" name="room_type" onChange={handleInputChange} placeholder="Select Room Type" mandatory>
                            <option value="1">NON AC Single</option>
                            <option value="2">NON AC Double</option>
                            <option value="3">AC Single</option>
                            <option value="4">AC Double</option>
                        </select>
                    </Grid>
                    <Grid item lg={12}>
                    <div className="d-flex align-center space-between">
                            <span>
                                <label className={classes.InputLabel}>
                                    Set New Price
                                    <span style={{color : 'red'}}>*</span>
                                </label>
                            </span>
                        </div>
                        <input type="number" min="0" name="room_charges" onChange={handleInputChange} mandatory />
                    </Grid>            
                    <Grid item lg={12}>
                        <div className="d-flex align-center space-between mt-10">
                            <button className="btn btn-outline-grey" onClick={handlePriceUpdate}>Cancel</button>
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
                            <p className="main-heading">
                                {
                                        state.data.roomCharges && state.data.roomCharges.map((room) => {
                                            if(room.room_type === "non_ac_single"){
                                                return (<span>Rs. {room.room_charges}</span>)
                                            }
                                        })
                                    }
                            </p>
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
                            <p className="main-heading">                                
                            {
                                        state.data.roomCharges && state.data.roomCharges.map((room) => {
                                            if(room.room_type === "non_ac_double"){
                                                return (<span>Rs. {room.room_charges}</span>)
                                            }
                                        })
                                    }</p>
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
                            <p className="main-heading">{
                                        state.data.roomCharges && state.data.roomCharges.map((room) => {
                                            if(room.room_type === "ac_single"){
                                                return (<span>Rs. {room.room_charges}</span>)
                                            }
                                        })
                                    }</p>
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
                            <p className="main-heading">{
                                        state.data.roomCharges && state.data.roomCharges.map((room) => {
                                            if(room.room_type === "ac_double"){
                                                return (<span>Rs. {room.room_charges}</span>)
                                            }
                                        })
                                    }</p>
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
