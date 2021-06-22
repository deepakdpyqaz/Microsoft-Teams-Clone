// This component is for displaying video
import React from 'react';
import './videodisplay.scss';
import captureSelfVideo from '../SelfVideo/SelfVideo';
import video from '../../assets/video.mp4';
// const VideoDisplay = (props)=>{
//     const [source,setSource] =  useState(null);
//     const classList = ['video_wrapper'];
//     if(props.stream){
//     console.log(props.stream.getTracks());
//         setSource()
//     }
//     if(props.self)
//     {
//         classList.push('video_wrapper--self');
//     }
//     return(
//         <>

//             <div className={classList.join(" ")}>
//                 <video src={video} controls></video>
//             </div>
//         </>
//     )
// }
// export default VideoDisplay;

class VideoDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { classList: ['video_wrapper'] };
        this.videoRef = React.createRef();
    }
    componentDidMount() {
        if (this.props.self) {
            this.setState((prevState, props) => {
                let newClassList = [...this.state.classList, 'video_wrapper--self'];
                return {
                    ...prevState,
                    classList: newClassList
                }
            })
            
            captureSelfVideo(this.props.selfStreamControl).then((stream) => {
                this.videoRef.current.srcObject = stream;
            })
        }
    }
    componentDidUpdate() {
        if (this.props.selfStreamControl) {
            if (this.props.selfStreamControl.audio || this.props.selfStreamControl.video) {
                captureSelfVideo(this.props.selfStreamControl).then((stream) => {
                    this.videoRef.current.srcObject = stream;
                })
            }
            else {
                this.videoRef.current.srcObject = null;
            }
        }
    }
    render() {
        return (<>
            <div className={this.state.classList.join(" ")}>
                <video ref={this.videoRef} autoPlay muted></video>
            </div>
        </>
        )
    }
}

export default VideoDisplay;