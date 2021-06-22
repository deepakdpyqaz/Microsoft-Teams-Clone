// This component is for displaying video
import React from "react";
import "./videodisplay.scss";
import captureSelfVideo from "../SelfVideo/SelfVideo";
import video from "../../assets/video.mp4";
import PropTypes from "prop-types";
class VideoDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {classList: ["video_wrapper"]};
    this.videoRef = React.createRef();
  }
  componentDidMount() {
    if (this.props.self) {
      this.setState((prevState, props) => {
        const newClassList = [...this.state.classList, "video_wrapper--self"];
        return {
          ...prevState,
          classList: newClassList,
        };
      });

      captureSelfVideo(this.props.selfStreamControl).then((stream) => {
        this.videoRef.current.srcObject = stream;
      });
    }
  }
  componentDidUpdate() {
    if (this.props.selfStreamControl) {
      if (this.props.selfStreamControl.audio || this.props.selfStreamControl.video) {
        captureSelfVideo(this.props.selfStreamControl).then((stream) => {
          this.videoRef.current.srcObject = stream;
        });
      } else {
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
    );
  }
}

VideoDisplay.propTypes={
  self: PropTypes.bool,
  selfStreamControl: PropTypes.object,
};
export default VideoDisplay;
