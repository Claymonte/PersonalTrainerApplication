import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import { CSVLink} from "react-csv";


class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {customers : [], open: false, message: ""}
    }
componentDidMount() {
    this.fetchCustomers();
}

fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then (res => res.json())
    .then(jsondata => this.setState({customers: jsondata.content}))
}

deleteCustomer = (link) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
        fetch(link, {method: 'DELETE'})
        .then(res => this.fetchCustomers())
        .then(res => this.setState({open: true, message: 'Customer deleted'}))
        .catch(err => console.error(err))
    }
}

addCustomer = newCustomer => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCustomer)
    })
    .then(res => this.fetchCustomers())
    .then(res => this.setState({open: true, message: 'New customer saved'}))
    .catch(err => console.error(err));
}

editCustomer = (link, customer) => {
    fetch(link, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
    .then(res => this.fetchCustomers())
        .then(res => this.setState({open: true, message: 'Changes saved'}))
        .catch(err => console.error(err));       
}
handleClose = () => {
    this.setState({open: false})
}

    render() {
        const columns  = [
            {
                Header: 'Firstname',
                accessor: 'firstname'
            },
            {
                Header: 'Lastname',
                accessor: 'lastname'
            },{
                Header: 'Streetaddress',
                accessor: 'streetaddress'
            },{
                Header: 'Postcode',
                accessor: 'postcode'
            },{
                Header: 'City',
                accessor: 'city'
            },{
                Header: 'Email',
                accessor: 'email'
            },{
                Header: 'Phone',
                accessor: 'phone'
            },{ 
                Header: "",
                filterable: false,
                sortable: false,
                width: 90,
                accessor: "_links.self.href",
                Cell: ({value, row}) => (<EditCustomer editCustomer={this.editCustomer} customer={row} link={value} />)
            },{
                Header: '',
                filterable: false,
                sortable: false,
                width: 90,
                accessor: '_links.self.href',
                Cell: ({value}) => <Button color='secondary' size='small' onClick={() =>this.deleteCustomer(value)}>DELETE</Button>
                
            }
        ]




        return (
            <div>
                <AddCustomer addCustomer={this.addCustomer} />
                <CSVLink separator={";"} data={this.state.customers}>Download CSV</CSVLink>
                <ReactTable filterable={true} data={this.state.customers} columns={columns} defaultPageSize={10} />
                <Snackbar 
                open={this.state.open}
                autoHideDuration={3000}
                onClose={this.handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                message={this.state.message}
                />
            </div>
        );
    }
}

export default CustomerList;