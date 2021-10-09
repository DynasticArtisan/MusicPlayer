import React, { useRef, useState } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Grid } from "@material-ui/core"
import FileUpload from './FileUpload'
import { useDispatch } from 'react-redux';
import { TracksActionCreators } from '../../Store/reducers/tracks/actionCreatores';

export default function Upload() {
    const [open, setOpen] = useState(false);

    const [name, setName] = useState('')
    const [artist, setArtist] = useState('')
    const [audio, setAudio] = useState(null)
    const [picture, setPicture] = useState(null)

    const dispatch = useDispatch()
    const handleClickOpen = () => {
      setOpen(true);
    };

  const handleClose = () => {
    setOpen(false);
    clearFields()
  };

  const clearFields = () => {
    setName('')
    setArtist('')
    setAudio(null)
    setPicture(null)
  }

  const previewRef = useRef<any>()
 

  const handleSubmit = () => {
      if(!audio || !picture) {
          return null
      }
      const formData = new FormData()
      formData.append('name', name)
      formData.append('artist', artist)
      picture && formData.append('picture', picture as any)
      formData.append('audio', audio as any)
      dispatch(TracksActionCreators.uploadTrack(formData))
      clearFields()
  }

  return (
    <>     
      <Button  variant="outlined" color="secondary" onClick={handleClickOpen}>
        Upload your track
      </Button>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Upload new track</DialogTitle>
        <DialogContent style={{cursor:'pointer', width:'300px', display:'flex', flexDirection:'column', alignItems:'center'}}> 
            {
              audio ? 
                <>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Track"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                  <TextField
                    margin="dense"
                    id="artist"
                    label="Artist"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    />
                  <FileUpload setFile={setPicture} accept="image/*" >
                  <img ref={previewRef} src={picture? URL.createObjectURL(picture) :"../audio.jpg"} alt="preview" className="preview" style={{ marginTop:'20px' ,width: "200px", height: "200px", objectFit: "cover", borderRadius:"15px"}} />
                  </FileUpload>
                </>
              :
                <FileUpload setFile={setAudio} accept="audio/*">
                    <Button>Select audio file</Button>
                </FileUpload>
            }
            
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!(name&&artist&&audio)}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
