import { Button, Container, Grid, Typography } from "@material-ui/core"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Navbar from "../Components/Navbar/Navbar"
import TrackList from "../Components/Tracklist/TrackList"
import { useTypedSelector } from "../Hooks/useTypedSelector"
import { TracksActionCreators } from "../Store/reducers/tracks/actionCreatores"
import Upload from '../Components/Upload/Upload'
import { AuthActionCreators } from "../Store/reducers/auth/actionCreators"
import Notifications from '../Components/Notifications/Notifications'
import { NotifsActionCreators } from "../Store/reducers/notifs/actionCreators"
import { ISnackbar } from "../models/Snackbar"
import Player from '../Components/Player/Player'
const MyMusic = () => {
    const { userTracks, userLikedTracks } = useTypedSelector(state => state.tracks)
    

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(TracksActionCreators.getUserTracks())
        dispatch(TracksActionCreators.getUserLikedTracks())        
    }, [])

    const dislikeHandler = (id: string) => {
        dispatch(TracksActionCreators.dislikeTrack(id))
    }

    const removeHandler = (id: string) => {
        dispatch(TracksActionCreators.likeTrack(id))
    }

    return (<>
            <Container>
                <TrackList tracks={userTracks} remove={removeHandler}>
                    <Grid container justifyContent='space-between' alignItems='center' style={{marginBottom:'20px'}}>
                        <Typography variant="h3" gutterBottom color="secondary">
                            Мои треки
                        </Typography>
                        <Upload/>
                    </Grid>
                </TrackList>
                
                {
                    userLikedTracks.length > 0 &&
                    <TrackList tracks={userLikedTracks} dislike={dislikeHandler}>
                        <Grid container justifyContent='space-between' alignItems='center'>
                            <Typography variant="h4" gutterBottom color="secondary">
                                Добавленные
                            </Typography>
                        </Grid> 
                    </TrackList>
                }
                
            </Container>
            
        </>
    )
}

export default MyMusic
