// This will contain the controls of the calls 
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CallEndIcon from '@material-ui/icons/CallEnd';
import ChatIcon from '@material-ui/icons/Chat';
import './callcontrol.scss';
import { Copy } from '../Copy/Copy';
import {Link} from 'react-router-dom';

const CallControl = (props) => {

    return (
        <div className='call_control'>
            <Link to="/chat"><Button variant="contained" color='secondary'><ChatIcon /></Button></Link>
            <Button variant="contained" color='secondary' onClick={()=>{props.disconnect()}}><CallEndIcon /></Button>
            <Copy />
        </div>
    )
}

export default CallControl;