import React from 'react'
import { Snackbar, SnackbarContent } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { ISnackbar } from '../../models/Snackbar';

const Notifications :React.FC<any> = ({ notifs , onClose  }) => {
    
    return (
        <Snackbar open={Boolean(notifs.length)}  >
            <div>
            {
                notifs.map((mes :ISnackbar) =>  {
                    setTimeout(()=>{
                        onClose(mes)
                    }, 5000)

                    return <MuiAlert key={mes.id} style={{margin:'5px 0', minWidth:'300px'}} onClose={() => onClose(mes)} severity={mes.severity} elevation={5} variant="filled">
                                                    {mes.message}
                                                </MuiAlert>
                    }
                )
            }
            </div>
        </Snackbar>
    )
}

export default Notifications
