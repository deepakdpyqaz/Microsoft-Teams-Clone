import React from 'react';
const captureSelfVideo = async (params)=>{
    let video=null;
    if(!(params.audio || params.video))
    {
        return new MediaStream();
    }
    video = await window.navigator.mediaDevices.getUserMedia(params);
    return video
}

const getSelfStream = (params)=>{
    const videoRef = React.createRef();
    captureSelfVideo(params).then((stream)=>{
        videoRef.current.srcObject = stream;
    })
    return videoRef;
 }
export {getSelfStream,captureSelfVideo};
