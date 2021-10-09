import { Button, Container, Grid, TextField, Typography } from "@material-ui/core"
import TrackList from '../Components/Tracklist/TrackList'
import Navbar from "../Components/Navbar/Navbar"
import NotActivated from "../Components/NotActivated/NotActivated"
import { useTypedSelector } from "../Hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { TracksActionCreators } from '../Store/reducers/tracks/actionCreatores'
import Notifications from '../Components/Notifications/Notifications'
import { NotifsActionCreators } from "../Store/reducers/notifs/actionCreators"
import { ISnackbar } from "../models/Snackbar"
import { searchActionsCreator } from "../Store/reducers/search/actionCreators"

const MainPage = () => {
    const user = useTypedSelector(state => state.auth.user)
    
    const dispatch = useDispatch()

    //------------------Search-------------------------
    const { query, tracks } = useTypedSelector(state => state.search)
    const searchHandler = () => {
        dispatch(searchActionsCreator.search(query))
    }
    useEffect(()=>{
        dispatch(searchActionsCreator.search(query))
      },[])



    
    if (!user?.isActivated){
        return (
            <NotActivated/>    
        )
    }



    const likeHandler = (id: string) => {
        dispatch(TracksActionCreators.likeTrack(id))
    }

    return (<>
            <Container>
                <Grid container justifyContent="space-between" alignItems="center" style={{marginBottom:'20px'}} >
                    <Typography variant="h3" gutterBottom color="secondary">
                        Поиск треков
                    </Typography>
                    <div>
                        <TextField color="secondary" value={query} onChange={(e) => {dispatch(searchActionsCreator.setSearchQuery(e.target.value))}}/>
                        <Button onClick={searchHandler}>Search</Button>
                    </div>
                </Grid>

                <TrackList tracks={tracks} like={likeHandler}/> 
            </Container>
        </>
    )
}

export default MainPage
