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
import AddCustomer from './AddCustomer';

export default function CustomerList() {
    
    const [customers, setCustomers] = useState([]);
    
    useEffect(() => fetchCustomers(), []);
    
    // Getting the CUSTOMER listing data from backend source and converting it.
    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    // Defining table's column content. Field refers to specific data that was previously fetched.
    const [state] = useState({
        columns: [
            {title: 'First name', field: 'firstname'},
            {title: 'Last name', field: 'lastname'},
            {title: 'E-Mail', field: 'email'},
            {title: 'Phone', field: 'phone'},
            {title: 'Street', field: 'streetaddress'},
            {title: 'Postcode', field: 'postcode'},
            {title: 'City', field: 'city'}
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

    // Adding and saving a new customer.
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => window.error(err))
    }

    // Editing existing row data.
    const editCustomer = (customer) => {
        const updatedCustomer = {
          firstname: customer.firstname,
          lastname: customer.lastname,
          email: customer.email,
          phone: customer.phone,
          streetaddress: customer.streetaddress,
          postcode: customer.postcode,
          city: customer.city
    } 
    
    fetch(customer.links[0].href, {
      method: 'PUT',
      headers: {
          'Content-Type':'application/json'
      },
      body: JSON.stringify(customer)
    })
    .then(_ => fetchCustomers())
    .catch(err => console.error(err))
    }


    return (
        <div className='list'>
            <AddCustomer saveCustomer={saveCustomer}/>
            <MaterialTable title='Customer List' columns={state.columns} data={customers} icons={tableIcons} 
            editable={{
                onRowUpdate: (newData, _) =>
                    new Promise((resolve, _) => {
                        editCustomer(newData);
                        resolve();
                    })
            }} />
        </div>
    );
}