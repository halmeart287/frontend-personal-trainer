import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TrainingList from './TrainingList';


// Note. This is not the same as adding a customer. Here I should attach 'Customer' to 'Training'.
// WIP...
// Instead of a Button and copying AddCustomer.js, I should add onClick row fuction to open up a new form,
// that would present selected Customer's name and dropdown selection of available trainings..?
export default function AddTrainings(props) {

    const [customerTraining, setCustomerTraining] = React.useState({
        activity: '', date: '', duration: '', customer: ''
    });

    const [customer, setCustomer] = React.useState({
        firstname: '', lastname: '', email: '',
        phone: '', streetaddress: '', postcode: '', city: ''
    });

    const fetchCustomer = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomer(data.content))
        .catch(err => console.error(err))
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        fetchCustomer();
        setOpen(true);
    }
  
    const handleClose = () => {
        setOpen(false);
    }

    const handleInputChange = (event) => {
        setCustomerTraining({...customerTraining, [event.target.name]: event.target.value})
        setCustomer({...customer, [event.target.name]: event.target.value })
    }

    const addTraining = () => {
        handleClickOpen();
        props.saveTraining(customerTraining);
        handleClose();
    }


    return(
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                    <DialogTitle id='form-dialog-title'>Add a training to customer.</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                disabled='true'
                                margin='dense'
                                name='firstname'
                                value={customer.firstname}
                                fullWidth
                            />
                            <TextField
                                onChange={e => handleInputChange(e)}
                                fullWidth
                            />
                            <select>
                                <option>
                                    {trainings.activity}
                                </option>
                            </select>
                        </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={addTraining} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
        </div>
    )
} 