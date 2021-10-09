import { Button, Card, Container, Grid, Snackbar, TextField, Typography } from '@material-ui/core'
import { truncate } from 'fs'
import React, { ReactElement, useEffect, useState } from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { useTypedSelector } from '../Hooks/useTypedSelector'
import { useValidateInput } from '../Hooks/useValidateInput'
import {AuthActionCreators} from '../Store/reducers/auth/actionCreators'

import Notifications from '../Components/Notifications/Notifications'
import { NotifsActionCreators } from "../Store/reducers/notifs/actionCreators"
import { ISnackbar } from "../models/Snackbar"

const Login = () :any =>  {
    const email = useValidateInput('email')
    const password = useValidateInput('notEmpty')

    const dispatch = useDispatch()
    const history = useHistory()

    const inputStyle = { WebkitBoxShadow: "0 0 0 100px #151515 inset" };
    
    const loginHandler = () => {
        dispatch(AuthActionCreators.login(email.value, password.value))
    }


    return (
            <Container >
                <Grid container justifyContent="center" alignItems="center" style={{height:"100vh", padding:"30px 20px"}}>
                    
                        <div style={{padding:"30px 20px"}}>
                            <Grid container direction="column" spacing={1} justifyContent="space-around" alignItems="center">
                                <Grid item>
                                <Typography variant="h3" gutterBottom color="secondary">
                                   Login
                                </Typography>
                                </Grid>
                                <Grid item>
                                    <TextField id="outlined-basic" label="Email adress" variant="outlined" color="secondary" {...email} inputProps={{ style: inputStyle }}/>
                                </Grid>
                                <Grid item>
                                    <TextField id="outlined-basic" type="password" label="Password" variant="outlined" color="secondary" {...password} inputProps={{ style: inputStyle }}/>
                                </Grid>
                                <Grid item container spacing={1} justifyContent="center" style={{marginTop:"10px"}}>
                                    <Grid item>
                                        <Button variant="contained" color="secondary" disabled={!email.value || !password.value || email.error || password.error}
                                        onClick={loginHandler}
                                        >Sign in</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" color="secondary" onClick={()=>history.push('/registration')}>Sign up</Button>
                                    </Grid>
                                </Grid> 
                            </Grid>
                        </div>     


                        
                          
                </Grid>



                
      
                

            </Container>


        
            
    )
}

export default Login
