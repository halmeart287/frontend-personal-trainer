import React from 'react';


// Note. This is not the same as adding a customer. Here we attach 'Customer' to 'Training'.
export default function AddTrainings(props) {

    const [customerTraining, setCustomerTraining] = React.useState({
        activity: '', date: '', duration: '', customer: ''
    });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }
  
    const handleClose = () => {
        props.addTraining(customerTraining);
        setOpen(false);
    }




    return(
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                    <DialogTitle id='form-dialog-title'>Add a training to customer.</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                disabled id='standard-disabled'
                                margin='dense'
                                name='firstname'
                                value={customer.firstname}
                                label='First Name'
                                fullWidth
                            />
                            <TextField
                                disabled id='standard-disabled'
                                margin='dense'
                                name='lastname'
                                value={customer.lastname}
                                label='Last Name'
                                fullWidth
                            />
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