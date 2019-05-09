import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import AddTraining from './AddTraining';
import moment from 'moment';

class TrainingList extends Component {
    constructor(props) {
        super(props) 
        this.state = {trainings: [], open: false, message: ''};
        
    }
    componentDidMount () {
        this.fetchTrainings();
    }    

    fetchTrainings = () => {
        fetch ('https://customerrest.herokuapp.com/gettrainings')
        .then (response => response.json())
        .then (jsondata => this.setState({trainings: jsondata}))
        .catch(err => console.error(err));
    }

    deleteTraining = (link) => {
        if(window.confirm("Are you sure you want to delete this training session?")) {
          fetch('https://customerrest.herokuapp.com/api/trainings/' + link, 
          { method: "DELETE" })
            .then(response => this.fetchTrainings())
            .then(response => this.setState({open: true, message: 'Training deleted'}))
            .catch(err => console.error(err));
        }
      }

      addTraining = newTraining => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTraining)
        })
        .then(res => this.fetchTrainings())
        .then(res => this.setState({open: true, message: 'New training saved'}))
        .catch(err => console.error(err));
    }

      editTraining = (link, training) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(response => this.fetchTrainings())
        .then(response => this.setState({open: true, message: 'Changes saved'}))
        .catch (err => console.error(err));
    }

    handleClose = (event, reason) => {
        this.setState({open: false});
    };

    render() {

        const columns = [
            {
                Header: "Activity",
                accessor: "activity"
            },
            {
                Header: "Date",
                accessor: "date",
                Cell: row => (
                    <span>
                        {moment(row.value).format("D.M.YYYY")}
                    </span>
                )
            },
            {
                Header: "Duration (min)",
                accessor: "duration"
            },{
                Header: "Firstname",
                accessor: "customer.firstname"
            },{
                Header: "Lastname",
                accessor: "customer.lastname"
            },{
                Header: "",
                filterable: false,
                sortable: false,
                witdth: 90,
                accessor: "id",
                Cell: ({value}) => <Button color="secondary" variant="contained" size="small" onClick={() => this.deleteTraining(value)}>Delete training</Button>
            }
    ];

        return (
            <div>
                <AddTraining addTraining={this.addTraining} />
                <ReactTable
                    data={this.state.trainings}
                    columns={columns}
                    filterable={true}
                    defaultPageSize={10}
                />

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.open}
                autoHideDuration={3000}
                onClose={this.handleClose}
                message={this.state.message}
                />
            </div>
        );
    }
}

export default TrainingList;