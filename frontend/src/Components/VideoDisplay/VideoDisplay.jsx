// This component is for displaying video
import React,{useState} from 'react';
import './videodisplay.scss';
import video from '../../assets/video.mp4'
const VideoDisplay = (props)=>{
    const [source,setSource] =  useState(null);
    const classList = ['video_wrapper'];
    if(props.stream){
    console.log(props.stream.getTracks());
        setSource()
    }
    if(props.self)
    {
        classList.push('video_wrapper--self');
    }
    return(
        <>
            
            <div className={classList.join(" ")}>
                <video src={video} controls></video>
            </div>
        </>
    )
}
export default VideoDisplay;