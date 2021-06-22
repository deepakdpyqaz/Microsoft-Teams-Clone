import React, { useState } from 'react';
import CallControl from "../../Components/CallControls/CallControl";
import VideoDisplay from "../../Components/VideoDisplay/VideoDisplay";
import './videocallscreen.scss';
const VideoCallScreen = () => {
    const [selfStreamControl,setSelfStreamControl] = useState({'audio':true,'video':true});

    
    const handleChangeControl=(controls) => {
        setSelfStreamControl({'audio':controls.microphone,'video':controls.camera})
    }
    return (
        <>
            <div className="video_display_wrapper">
                <VideoDisplay self={false} />
                <VideoDisplay selfStreamControl={selfStreamControl} self={true} />
            </div>
            <CallControl changeControl={handleChangeControl}/>
        </>
    )
}

export default VideoCallScreen;