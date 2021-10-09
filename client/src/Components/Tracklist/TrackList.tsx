import { Card, Grid, IconButton, Typography } from '@material-ui/core';
import { AddBox, Delete, Remove } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { ITrack } from '../../models/ITrack';
import { playerActionsCreator } from '../../Store/reducers/player/actionsCreator';
import styles from './style.module.css'

const TrackItem : React.FC<any> = ({ track, like, dislike, remove }) => {
    const dispatch = useDispatch()
    //------------------Player-------------------------
    const playTrack = (track :ITrack) => {
        dispatch(playerActionsCreator.setActiveTrack(track))
    }
    
    const time = (duration :number) => {
        let min = Math.floor(duration/60)
        let sec = String(duration%60)
        if(sec.length < 2){
            sec = '0'+sec
        }
        return `${min} : ${sec}`
    }

    return (
        <Grid item md={4} sm={6} xs={12}  style={{cursor:'pointer'}}>
            <Card style={{borderRadius: '70px', overflow: 'hidden', height:'70px', background:'#222222'}}>
                <div className={styles.trackItem} onClick={()=>playTrack(track)}>
                <img className={styles.picture} src={`http://localhost:5000/${track.picture}`} alt="picture" />
                <div className={styles.discr}>
                    <div className="name">{track.name}</div>
                    <div className="artist">{track.artist}</div>
                </div>
                {
                    like &&  <IconButton onClick={(e :any)=>{ e.stopPropagation(); like(track._id)} }edge="start" color="inherit" aria-label="menu"><AddBox /></IconButton>
                }
                {
                    dislike &&  <IconButton onClick={(e :any)=>{ e.stopPropagation(); dislike(track._id)}} edge="start" color="inherit" aria-label="menu"><Remove /></IconButton>
                }
                {
                    remove &&  <IconButton onClick={(e :any)=>{ e.stopPropagation(); remove(track._id)}} edge="start" color="inherit" aria-label="menu"><Delete /></IconButton>
                }
                <div className={styles.time}>{time(track.duration)}</div>
            </div>   
            </Card>

        </Grid>

    )
}


const TrackList : React.FC<any> = ({ tracks, children, like, dislike, remove}) => {


    return (
        <div>
            { children }    
            <Grid container spacing={3}>
                {tracks?.map((track :any) => <TrackItem track={track} like={like} dislike={dislike} remove={remove} />)}
            </Grid>


        </div>
    )
}

export default TrackList
