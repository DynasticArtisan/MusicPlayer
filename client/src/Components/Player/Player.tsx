import { Button, Container, Grid, IconButton, Slider, Typography } from '@material-ui/core'
import { KeyboardArrowDown, Pause, PlayArrow, SkipNext, SkipPrevious, VolumeUp } from '@material-ui/icons'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { playerActionsCreator } from '../../Store/reducers/player/actionsCreator'

let audio :HTMLMediaElement ;

const Player = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const { active, pause, duration, currentTime, volume } = useTypedSelector(state => state.player)
    useEffect(()=>{
        if(!audio){
            audio = new Audio()
        }
        else {
            setAudio()          
        }
    },[active])

    useEffect(()=>{
        if(audio){
            if(pause){
                audio.pause()
            } else {
                audio.play()
            }
        }
    }, [pause])

    const setAudio = () => {
        if(active){          
            audio.src = 'http://localhost:5000/'+active.audio;
            audio.volume = volume / 100;
            audio.onloadedmetadata = () => {                
                dispatch(playerActionsCreator.setTrackDuration(audio.duration))
                dispatch(playerActionsCreator.playTrack())
            }
            audio.ontimeupdate = () => {  
                dispatch(playerActionsCreator.setCurrentTrackTime(audio.currentTime))
            }
        }
    }  

    const play = () => {
        if (pause) {
            dispatch(playerActionsCreator.playTrack())
            
        } else {
            dispatch(playerActionsCreator.pauseTrack())
        }
    }

    const rewindHandler = (time :any) => {
        dispatch(playerActionsCreator.setCurrentTrackTime(time))
        audio.currentTime = time
    }

    if(!active){
        return null
    }
    
    return (
        <>
            <div className="player player-desktop" >
                <Slider min={0} max={duration} value={currentTime} onChange={(e :any, val) => rewindHandler(val)} style={{position: 'absolute', top: 0, padding: 0}}/>
                <Container>
                    <Grid container alignItems="center" justifyContent="space-between" >
                        <Grid item>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item >
                                    <IconButton onClick={()=> play()} >
                                        {
                                            !pause ?
                                            <Pause fontSize="large"/> :
                                            <PlayArrow fontSize="large"/>  
                                        }
                                    </IconButton> 
                                </Grid>
                                <Grid item >
                                    <img src={active.picture? 'http://localhost:5000/'+ active.picture : '../audio.jpg'} alt="image" width={50} height={50} style={{borderRadius:'50%', objectFit:'cover'}}/>
                                </Grid>
                                <Grid item sm >   
                                    <h6 className="name">{active?.name}</h6>
                                    <div className="artist">{active?.artist}</div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            {Math.floor(currentTime/60)}:{Math.floor(currentTime%60/10)}{Math.floor(currentTime%60%10)} / {Math.floor(duration/60)}:{Math.floor(duration%60/10)}{Math.floor(duration%60%10)}
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <div className={open ? 'player-opened player-mobile' : 'player player-mobile'} onClick={()=>{if(!open){setOpen(true)}}}>
                <Container>
                    {
                    open 
                    ?
                        <Grid container direction="column" alignItems="center"  spacing={2}>
                            <KeyboardArrowDown color="primary" onClick={()=>setOpen(false)} style={{fontSize: 200, margin: '-75px 0 -55px' }}/> 
                            <Grid item >
                                <img src={active.picture? 'http://localhost:5000/'+ active.picture : '../audio.jpg'} alt="image" width={270} height={270} style={{borderRadius:'50%', objectFit:'cover'}}/>
                            </Grid>
                            <Grid item sm > 
                                <Typography variant="h3" gutterBottom color="primary" style={{margin:'0'}}>{active?.name}</Typography>  
                                <Typography variant="h5" gutterBottom style={{margin:'0'}}>{active?.artist}</Typography>  
                            </Grid>
                            <Slider min={0} max={duration} value={currentTime} onChange={(e :any, val) => rewindHandler(val)} />
                            <Grid container justifyContent="space-between" style={{marginTop:'-17px'}}>
                                <Grid item >
                                    {Math.floor(currentTime/60)}:{Math.floor(currentTime%60/10)}{Math.floor(currentTime%60%10)}
                                </Grid>
                                <Grid item >
                                    {Math.floor(duration/60)}:{Math.floor(duration%60/10)}{Math.floor(duration%60%10)}
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center">
                                <IconButton>
                                    <SkipPrevious/>
                                </IconButton>
                                
                                <IconButton  onClick={(e)=> {
                                    e.stopPropagation()
                                    play()}
                                } >
                                    
                                {
                                    !pause ?
                                    <Pause style={{fontSize:60}}/> :
                                    <PlayArrow style={{fontSize:60}}/>  
                                }
                                    
                                </IconButton> 
                                <IconButton>
                                    <SkipNext/>
                                </IconButton>
                            </Grid>
                            
                        </Grid>
                    
                    :
                    <Grid container spacing={2} alignItems="center">
                        <Grid item >
                            <IconButton onClick={(e)=> {
                                    e.stopPropagation()
                                    play()}
                                } >
                                {
                                    !pause ?
                                    <Pause fontSize="large"/> :
                                    <PlayArrow fontSize="large"/>  
                                }
                            </IconButton> 
                        </Grid>
                        <Grid item sm >   
                            <h6 className="name">{active?.name}</h6>
                            <div className="artist">{active?.artist}</div>
                        </Grid>
                        
                    </Grid>
                    }
                </Container>
            </div>
        <style>
            {`
                .player {
                    position: fixed;
                    padding: 10px 0;
                    color: white;
                    width: 100%;    
                    bottom: 0;
                    background-color: #6a1b9a;
                    color: black;
                    z-index: 100;
                    height: 80px;
                    transition: all .3s ;

                }
                .player-opened {
                    position: fixed;
                    bottom: 0;
                    height: 100vh;
                    width: 100%;
                    background-color: #6a1b9a;
                    transition: all .3s ;
                }
                .name {
                    color: white;
                    font-size: 18px;
                    font-weight: normal;
                }
                .artist {
                    color: #999;
                }
                .time {
                    color: #999;
                    margin-left: 5px;
                    font-size: 15px;
                }

                .player-mobile {
                    display: none;
                }

                @media (max-width: 550px) {
                    .player-desktop {
                        display: none;
                    }
                    .player-mobile {
                        display: block;
                    }
                }
            `}
        </style>
        </>
    )
}

export default Player
