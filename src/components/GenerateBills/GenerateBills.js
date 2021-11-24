import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


export default function GenerateBills() {
      const [state, setState] = React.useState({data: {}});
      const [open, setOpen] = React.useState(false);

        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };
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

    function handleCheckout(e, guest){
        console.log("OPOPOP", guest)
        setState(new_state => ({
            ...new_state,
            data: {
                ...new_state.data,
                guest_id: guest.guest
            }
        }))
        fetch("http://127.0.0.1:8000/checkout/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(guest)
        }).then(res => res.json())
        .then(data => {
            setOpen(true);
            setState(new_state => ({
                ...new_state,
                data: {
                    ...new_state.data,
                    guest_bill: data
                }
            }))
        })
        .catch(err => console.log(err))
    }

    function handleDeleteGuest(){
        fetch(`http://localhost:8000/api/guests/${state.data.guest_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {setOpen(false); window.location.reload()}).catch(err => console.log(err))
    }
   
        return (
            <>
            {
                open ? 
                <>
                <div>
                <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        >
                        <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Guest Bill
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleDeleteGuest}>
                        Confirm Checkout
                        </Button>
                    </Toolbar>
                    </AppBar>
                    <div style={{padding: '40px'}}>
                        {
                            state.data.guest_bill ?
                            <>
                            <div style={{marginBottom: "5px"}}>
                                <span><b>Full Name: </b>{state.data.guest_bill['name']}</span>
                            </div>
                            <div style={{marginBottom: "5px"}}>
                                <span><b>Date/Time of Arrival: </b>{state.data.guest_bill['arrival']}</span>
                            </div>
                            <div style={{marginBottom: "5px"}}>
                                <span><b>Duration of Stay: </b>{state.data.guest_bill['days_of_stay']} days</span>
                            </div>
                            <div style={{marginBottom: "15px", textAlign: 'center'}}>
                                <span><b>{state.data.guest_bill['frequent'] ? "Congratulations for being a frequent Customer!!!. Discount Applied" : null}</b></span>
                            </div>
                            </>
                            :
                            null
                        }
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead >
                            <TableRow>
                                <TableCell style={{fontWeight: 'bold',fontSize:'18px'}}>Items</TableCell>
                                <TableCell align="right" style={{fontWeight: 'bold',fontSize:'18px'}}>Quantity/Type</TableCell>
                                <TableCell align="right" style={{fontWeight: 'bold',fontSize:'18px'}}>Price</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    state.data.guest_bill ?
                                    <>
                                    <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                <TableCell component="th" scope="row">
                                                    Room Type
                                                </TableCell>
                                                <TableCell align="right">{state.data.guest_bill['room_type']}</TableCell>
                                                <TableCell align="right">Rs. {state.data.guest_bill['room_price']}</TableCell>
                                                </TableRow>
                                                <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                <TableCell component="th" scope="row">
                                                    Breakfast
                                                </TableCell>
                                                <TableCell align="right">{state.data.guest_bill['breakfast']}</TableCell>
                                                <TableCell align="right">Rs. {state.data.guest_bill['breakfast_price']}</TableCell>
                                                </TableRow>
                                                <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                <TableCell component="th" scope="row">
                                                    Lunch
                                                </TableCell>
                                                <TableCell align="right">{state.data.guest_bill['lunch']}</TableCell>
                                                <TableCell align="right">Rs. {state.data.guest_bill['lunch_price']}</TableCell>
                                                </TableRow>
                                                <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                <TableCell component="th" scope="row">
                                                    Dinner
                                                </TableCell>
                                                <TableCell align="right">{state.data.guest_bill['dinner']}</TableCell>
                                                <TableCell align="right">Rs. {state.data.guest_bill['dinner_price']}</TableCell>
                                                </TableRow>
                                                <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                <TableCell component="th" scope="row">
                                                    Snacks
                                                </TableCell>
                                                <TableCell align="right">{state.data.guest_bill['snacks']}</TableCell>
                                                <TableCell align="right">Rs. {state.data.guest_bill['snacks_price']}</TableCell>
                                                </TableRow>
                                                <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                <TableCell component="th" scope="row">
                                                    Tax/GST
                                                </TableCell>
                                                <TableCell align="right"></TableCell>
                                                <TableCell align="right">Rs. {state.data.guest_bill['tax']}</TableCell>
                                                </TableRow>
                                                <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                <TableCell component="th" scope="row">
                                                    Discount Applied (If Any)
                                                </TableCell>
                                                <TableCell align="right"></TableCell>
                                                <TableCell align="right">Rs. -{state.data.guest_bill['discount'] ? state.data.guest_bill['discount'] : 0}</TableCell>
                                                </TableRow>
                                                <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                <TableCell component="th" scope="row">
                                                   Advance Paid (If Any)
                                                </TableCell>
                                                <TableCell align="right"></TableCell>
                                                <TableCell align="right">Rs. -{state.data.guest_bill['advance_paid']}</TableCell>
                                                </TableRow>
                                                <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                <TableCell component="th" scope="row">
                                                    <b>Total Amount to Pay</b>
                                                </TableCell>
                                                <TableCell align="right"></TableCell>
                                                <TableCell align="right"><b>Rs. {Number(state.data.guest_bill['total_price']).toFixed(2)}</b></TableCell>
                                                </TableRow>
                                    </>
                                    :
                                    null
                                }
                            </TableBody>
                        </Table>
                        </TableContainer>
                        </div>
                </Dialog>
                </div>
                </>
                :
                <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell style={{fontWeight: 'bold',fontSize:'18px'}}>Guest name</TableCell>
                    <TableCell align="right" style={{fontWeight: 'bold',fontSize:'18px'}}>Room Number</TableCell>
                    <TableCell align="right" style={{fontWeight: 'bold',fontSize:'18px'}}>Unique Token Number</TableCell>
                    <TableCell align="right" style={{fontWeight: 'bold',fontSize:'18px'}}></TableCell>
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
                                    <TableCell align="right"><button className="btn btn-danger" onClick={(e) => handleCheckout(e, guest)}>Checkout</button></TableCell>
                                    </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
            </TableContainer>
            }
            </>
          );
}

