// This component is for displaying video
import React from 'react';
import './videodisplay.scss';

const VideoDisplay = (props) =>{
    const classList = ['video_wrapper'];
    if(props.self)
    {
        classList.push('video_wrapper--self');
    }
    return (
        <div className={classList.join(" ")}>
            <video ref={props.videoRef} autoPlay muted={props.self}></video>
        </div>
    )
}
export default VideoDisplay;