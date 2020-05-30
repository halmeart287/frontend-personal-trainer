import React, { useState, useEffect, forwardRef } from 'react';
import MaterialTable from 'material-table';
// Material Table Icons. 'https://github.com/mbrn/material-table'.
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
// Moment.js for date formatting
import Moment from 'moment';

export default function TrainingList() {
    
    const [trainings, setTrainings] = useState([]);
    
    useEffect(() => fetchTrainings(), []);
    
    // Getting the TRAINING listing data from backend source and converting it.
    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }

    // Defining table's column content. Field refers to specific data that was previously fetched.
    const [state] = useState({
        columns: [
            {title: 'Activity', field: 'activity'},
            {title: 'Date', field: 'date', render: rowData => Moment(rowData.date).format('MMMM Do / YYYY')},
            {title: 'Time', field: 'date', render: rowData => Moment(rowData.date).format('hh:mm')},
            {title: 'Duration (minutes)', field: 'duration'}
        ]
    });

    // Adding external icons for Material-Table. Straight from 'https://github.com/mbrn/material-table'.
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    }

    // Deleting training type data.
    const deleteTraining = (training) => {

        fetch(training.links[0].href, {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(_ => fetchTrainings())
        .catch(err => console.error(err))
    }

    // Select row styling and actions
    const [selectedRow, setSelectedRow] = React.useState(null);

    
    return (
        <div className='list'>
            <MaterialTable title='Trainings List' columns={state.columns} data={trainings} icons={tableIcons}
            editable={{
                onRowDelete: (oldData, _) =>
                new Promise((resolve, _) => {
                    deleteTraining(oldData);
                    resolve();
                })
            }}
            localization={{ body: { editRow: { deleteText: 'Are you certain? There is no going back.'}}}}

            onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
            options={{
                rowStyle: rowData => ({
                    backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                })
            }}
            />
        </div>
    );
}