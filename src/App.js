import React from 'react';
import './App.css';
import SimpleMenu from './Components/SimpleMenu';
// AppBar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function App() {

    return (

        <div>
            <AppBar position='sticky'>
                <Toolbar variant="dense">
                <Typography variant="h6" color="inherit">
                    Personal Trainer App
                </Typography>
                </Toolbar>
            </AppBar>
            
            <SimpleMenu />
        </div>
    );

}

export default App;
