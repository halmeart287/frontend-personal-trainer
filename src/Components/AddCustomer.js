import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddCustomer(props) {

    const [customer, setCustomer] = React.useState({
        firstname: '', lastname: '', email: '',
        phone: '', streetaddress: '', postcode: '', city: ''
    });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
      
    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    const addCustomer = () => {
        props.saveCustomer(customer);
        handleClose();
    }

    return (
        <div>
            <Button style={{margin: 10}} size='small' variant='outlined' color='inherit' onClick={handleClickOpen}>
                Add
            </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                    <DialogTitle id='form-dialog-title'>Add a new customer</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin='dense'
                                name='firstname'
                                value={customer.firstname}
                                onChange={e => handleInputChange(e)}
                                label='First Name'
                                fullWidth
                            />
                            <TextField
                                margin='dense'
                                name='lastname'
                                value={customer.lastname}
                                onChange={e => handleInputChange(e)}
                                label='Last Name'
                                fullWidth
                            />
                            <TextField
                                margin='dense'
                                name='email'
                                value={customer.email}
                                onChange={e => handleInputChange(e)}
                                label='E-Mail'
                                fullWidth
                            />
                            <TextField
                                margin='dense'
                                name='phone'
                                value={customer.phone}
                                onChange={e => handleInputChange(e)}
                                label='Phone'
                                fullWidth
                            />
                            <TextField
                                margin='dense'
                                name='streetaddress'
                                value={customer.streetaddress}
                                onChange={e => handleInputChange(e)}
                                label='Street Address'
                                fullWidth
                            />
                            <TextField
                                margin='dense'
                                name='postcode'
                                value={customer.postcode}
                                onChange={e => handleInputChange(e)}
                                label='Postcode'
                                fullWidth
                            />
                            <TextField
                                margin='dense'
                                name='city'
                                value={customer.city}
                                onChange={e => handleInputChange(e)}
                                label='City'
                                fullWidth
                            />
                        </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={addCustomer} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
        </div>
    )
}

