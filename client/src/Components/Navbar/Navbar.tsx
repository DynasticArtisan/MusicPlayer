import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AuthActionCreators } from '../../Store/reducers/auth/actionCreators';
import { useDispatch } from 'react-redux';
import {routeNames} from '../../Router'
import { Container, Grid } from '@material-ui/core';
const Navbar = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const logoutHandler = () => {
      dispatch(AuthActionCreators.logout())
    }
    return (
        <AppBar position="static" color="secondary" >
          <Container>
            <Toolbar style={{background:'left bottom -9px / contain  no-repeat url(/cat.png)', padding:0}}>
              <Grid container alignItems="center" justifyContent="flex-end" >
                { 
                  location.pathname == routeNames.MYMUSIC ?
                  <Button color="primary" size="small" variant="outlined" onClick={()=>history.push(routeNames.MAIN)}>Search</Button> :
                  <Button color="primary" size="small" variant="outlined" onClick={()=>history.push(routeNames.MYMUSIC)}>My Music</Button>
                }

                <Button color="primary" size="small" variant="outlined" onClick={logoutHandler} style={{marginLeft:"20px"}}>Logout</Button>
              </Grid>

              
              

            </Toolbar>
          </Container>
            
        </AppBar>
    )
}

export default Navbar
