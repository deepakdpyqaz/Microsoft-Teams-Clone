import React, { useState } from 'react';
import CallControl from "../../Components/CallControls/CallControl";
import VideoDisplay from "../../Components/VideoDisplay/VideoDisplay";
import './videocallscreen.scss';
const VideoCallScreen = () => {
    const [selfStream,setSelfStream] = useState(null);

    
    const handleChangeControl=(controls) => {
        console.log(controls);
    }
    return (
        <>
            <div className="video_display_wrapper">
                <VideoDisplay self={false} />
                <VideoDisplay stream={selfStream} self={true} />
            </div>
            <CallControl changeControl={handleChangeControl}/>
        </>
    )
}

export default VideoCallScreen;