import React from 'react';
import CustomerList from './CustomerList';
import TrainingList from './TrainingList';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Calendar from 'react-calendar';

export default function SimpleMenu() {

    // Defining styles for constant 'classes'.
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
        },
        paper: {
          marginRight: theme.spacing(2),
          margin: '20px',
        },
        message: {
            margin: '20px',
        }
    }));

    const classes = useStyles();

    // Default state for 'page' view.
    // Notes: Can't pass 'classes.message' to 'openPage'. As in, the style won't get through for alternative message if set inside 'else' declaration.
    const [page, setPage] = React.useState(
        <div className={classes.message}>
            Welcome! What would you like to do today?
        </div>
    )

    // Menu functionality to open up specific views.
    const openPage = (event) => {
        if (event.target.value === 1)
            setPage(<CustomerList />)

        else if (event.target.value === 2)
            setPage(<TrainingList />)

        else if (event.target.value === 3)
            setPage(<Calendar />)
        
        else
            setPage(null)
    }

    return (
        <div>
            <Paper className={classes.paper}>
                <MenuList>
                    <MenuItem value='1' onClick={openPage}>Customer List</MenuItem>
                    <MenuItem value='2' onClick={openPage}>Tranings List</MenuItem>
                    <MenuItem value='3' onClick={openPage}>Calendar</MenuItem>
                    <MenuItem onClick={openPage}>Close all</MenuItem>
                </MenuList>
            </Paper>
        {page}
        </div>
    );
}