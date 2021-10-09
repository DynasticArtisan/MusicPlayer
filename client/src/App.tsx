
import { blueGrey, purple } from '@material-ui/core/colors';
import React, { useEffect } from 'react';
import AppRouter from './Components/Router/appRouter'
import Loader from './Components/Loader/Loader'
import './App.css';
import { useDispatch } from 'react-redux';
import { AuthActionCreators } from './Store/reducers/auth/actionCreators';
import { useTypedSelector } from './Hooks/useTypedSelector';
import Notifications from './Components/Notifications/Notifications';
import { NotifsActionCreators } from './Store/reducers/notifs/actionCreators';
import { ISnackbar } from './models/Snackbar';




function App() {
  //------------------Notification-------------------------
  const { messages } = useTypedSelector(state => state.notifications)
  const removeNotificationHandler = (message :ISnackbar) => {
      dispatch(NotifsActionCreators.clearMessage(message))
  }

  const dispatch= useDispatch()
  const isLoading = useTypedSelector(state => state.auth.isLoading)
  //const isLoading = true;
  useEffect(()=>{
    if(localStorage.getItem('token')){
      dispatch(AuthActionCreators.checkAuth())
    }

  },[])


  return (
      <>
        <div className="App">
          { isLoading ? 
            <Loader/> :
            <>
              <AppRouter/>
              <Notifications notifs={messages} onClose={removeNotificationHandler}/>
            </>        
          }             
        </div>
        <style>
          {`
            .App {
              height: 100vh;
            }
          `}
        </style>
       </> 
  );
}

export default App;
