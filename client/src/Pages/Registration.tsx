import {  Button, Card, Container, Grid, Snackbar, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router'
import { useValidateInput } from '../Hooks/useValidateInput'
import MuiAlert from '@material-ui/lab/Alert';
import { AuthActionCreators } from '../Store/reducers/auth/actionCreators';
import { useTypedSelector } from '../Hooks/useTypedSelector';
import { useDispatch } from 'react-redux';

import Notifications from '../Components/Notifications/Notifications'
import { NotifsActionCreators } from "../Store/reducers/notifs/actionCreators"
import { ISnackbar } from "../models/Snackbar"

const Registration = () => {
    const email = useValidateInput('email')
    const password = useValidateInput('password')
    const history = useHistory()
    const dispatch = useDispatch()

    const registryHandler = () => {
        dispatch(AuthActionCreators.registration(email.value, password.value))
    }



 

    return (
            <Container >
                <Grid container justifyContent="center" alignItems="center" style={{height:"100vh", padding:"30px 20px"}}>
                    
                        <div style={{padding:"30px 20px"}}>
                            <Grid container direction="column" spacing={1} justifyContent="space-around" alignItems="center">
                                <Grid item>
                                <Typography variant="h3" gutterBottom color="secondary">
                                   Registration
                                </Typography>
                                </Grid>

                                <Grid item>
                                    <TextField id="outlined-basic" label="Email adress" variant="outlined" color="secondary" {...email}/>
                                </Grid>

                                <Grid item>
                                    <TextField id="outlined-basic" label="Password" variant="outlined" color="secondary" {...password}/>
                                </Grid>

                                <Grid item container spacing={1} justifyContent="center" style={{marginTop:"10px"}}>
                                    <Grid item>
                                        <Button variant="contained" color="secondary" disabled={!email.value || !password.value || email.error || password.error}
                                        onClick={registryHandler}
                                        >Sign up</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" color="secondary" onClick={()=>history.push('/login')}>Sign in</Button>
                                    </Grid>
                                </Grid> 
                            </Grid>

                        </div>

                    
                </Grid>
                


            </Container>


        
            
    )
}

export default Registration
