// This will contain the controls of the calls 
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CallEndIcon from '@material-ui/icons/CallEnd';
import MicOffIcon from '@material-ui/icons/MicOff';
import MicIcon from '@material-ui/icons/Mic';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import './callcontrol.scss';
const CallControl = (props) => {
    const [control, setControl] = useState({ 'microphone': true, 'camera': true });
    const switchControl = (controlProperty) => {
        setControl((prevState) => {
            return {
                ...prevState,
                [controlProperty]: !prevState[controlProperty]
            }
        })
        props.changeControl(control);
    }

    return (
        <div className='call_control'>
            <Button variant="contained" color="secondary" onClick={() => switchControl("microphone")}>
                {(control.microphone ? <MicOffIcon /> : <MicIcon />)}
            </Button>
            <Button variant="contained" color='secondary'><CallEndIcon /></Button>
            <Button variant="contained" color="secondary" onClick={() => switchControl("camera")}>
                {(control.camera ? <VideocamOffIcon /> : <VideocamIcon />)}
            </Button>
        </div>
    )
}

export default CallControl;