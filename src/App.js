import React from 'react';
import './App.css';
import CustomerList from './Components/CustomerList';
import TrainingList from './Components/TrainingList';
// Menu
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

function App() {

    // Menu functionalities.
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
        },
        paper: {
          marginRight: theme.spacing(2),
        },
    }));

    const classes = useStyles();

    const [page, setPage] = React.useState();

    const openPage = (event) => {
        if (event.target.value === 1)
            setPage(<CustomerList />)

        else if (event.target.value === 2)
            setPage(<TrainingList />)
        
        else
            setPage(null)
    }

    return (

        <div>
            <Paper className={classes.paper}>
                <MenuList>
                    <MenuItem value='1' onClick={openPage}>Customer List</MenuItem>
                    <MenuItem value='2' onClick={openPage}>Tranings List</MenuItem>
                    <MenuItem onClick={openPage}>Close all</MenuItem>
                </MenuList>
            </Paper>
            {page}
        </div>
    );

}

export default App;
