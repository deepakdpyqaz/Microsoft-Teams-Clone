const captureSelfVideo = async (params)=>{
  let video=null;
  video = await window.navigator.mediaDevices.getUserMedia(params);
  // console.log(video);
  return video;
};

export default captureSelfVideo;
