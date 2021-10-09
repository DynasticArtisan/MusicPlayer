import { Button, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { AuthActionCreators } from '../../Store/reducers/auth/actionCreators'

const NotActivated  = () => {
    const dispatch = useDispatch()

    const logoutHandler = () => {
      dispatch(AuthActionCreators.logout())
    }

    return (
        <div className="page" style={{height: "100vh", display:'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center'}}>
           <div style={{textAlign: 'center', padding: '15px'}}>
                <img src='mailImage.svg'/>
                <Typography variant="h3" gutterBottom color="secondary">
                    Activation link has been sent to your email. 
                </Typography>
                <Button color="secondary" variant="outlined" onClick={logoutHandler}>Logout</Button>
           </div>

            
        </div>

    )
        
}

export default NotActivated
