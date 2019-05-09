import React, { Component } from 'react';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Home from './components/Home';
import Calendar from './components/Calendar';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'; 
//  import fire from './config/Fire';

class App extends Component {

//   constructor(props) {
//    super(props);
//     this.state = {
//       user:{},
//    }
//    }

//   componentDidMount() {
//     this.authListener();
//   }

// authListener() {
//   fire.auth().onAuthStateChanged((user) => {
//   //  console.log(user);
//     if (user) {
//       this.setState({user});
//     //  localStorage.setItem('user', user.uid);
//     }else {
//       this.setState({user: null});
//     // localStorage.removeItem('user);  
//     }
//   });
// }


  render() {
    return (
      <div className="App">

    
         <AppBar position="static">
          <Toolbar>
              <Typography variant="h6" color="inherit">
                Personal Trainer Workbench
              </Typography>
          </Toolbar>
        </AppBar>

        <BrowserRouter>
              <div class="Frame" style={{marginleft:24}}>
              <Link to="/" style={{textDecoration: 'none'}}><Button style={{marginTop:10, marginBottom:10, marginRight:5}} variant="outlined">Home</Button></Link>
     
              <Link to="/calendar" style={{textDecoration: 'none'}}><Button style={{marginTop:10, marginBottom:10, marginRight:5,}} color="secondary" variant="outlined" >Calendar</Button></Link>
              <Link to="/customers" style={{textDecoration: 'none'}}><Button style={{marginTop:10, marginBottom:10, marginRight:5}} color="primary" variant="outlined">Customers</Button></Link>
              <Link to="/trainings" style={{textDecoration: 'none'}}><Button style={{marginTop:10, marginBottom:10, marginRight:5}} color="green" variant="outlined">Trainings</Button></Link>
              </div>  
        

                  <Switch>
                    
              
                    <Route exact path="/" component={Home} />
                    <Route path= "/customers" component={CustomerList} />
                    <Route path= "/trainings" component={TrainingList} />
                    <Route exact path="/calendar" component={Calendar} />
                 </Switch>


        </BrowserRouter>
        
      </div>
    );
  }
}

export default App;