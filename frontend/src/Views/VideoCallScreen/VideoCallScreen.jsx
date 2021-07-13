import React, { useState, useEffect } from 'react';
import CallControl from "../../Components/CallControls/CallControl";
import VideoDisplay from "../../Components/VideoDisplay/VideoDisplay";
import './videocallscreen.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getSelfStream, captureSelfVideo } from '../../Components/SelfVideo/SelfVideo';
import { io } from 'socket.io-client';
import Peer from 'peerjs';
import constants  from '../../constants';
import { useHistory } from 'react-router-dom';
const VideoCallScreen = () => {
    const socket = io(constants.SERVER);
    const [selfStreamControl, setSelfStreamControl] = useState({ 'audio': true, 'video': true });
    const history = useHistory();
    const user = useSelector((state) => state.auth.user);

    const meetingId = useSelector((state) => state.meet.meetingId);
    const [called,setCalled] = useState(false);
    const [selfRef, setSelfRef] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [selfStream, setSelfStream] = useState(new MediaStream());
    const removeParticipant = (email) => {
        let newParticipantLists = participants.filter((participant)=>{
            return participant.email!=email;
        });
        setParticipants(newParticipantLists);
    }
    const addMe = function (selfStream) {
        socket.emit('addMe', { userDetails: user.payload, meetingId: meetingId });
        socket.on('sendCallRequests', (data) => {
            const participantDetails = data.participants;
            for (let participant of participantDetails) {
                const peer = new Peer();
                const ref = React.createRef();
                participant.ref= ref;
                participant.peer = peer;
                peer.on('open', (id) => {
                    socket.emit('callRequest', { toUser: participant.socketId, callId: id, user: user.payload.email });
                    peer.on('call', (call) => {
                        call.answer(selfStream);
                        call.on('stream', (remoteStream) => {
                            participant.ref.current.srcObject = remoteStream;
                        })
                    })
                });
            }
            setParticipants(participantDetails);
        });

        socket.on("makeCall", (data) => {
            const callId = data.callId;
            const participantUser = {email:data.user};
            const ref = React.createRef();
            participantUser.ref=ref;

            const peer = new Peer();
            participantUser.peer = peer;
            setParticipants((prevState)=>{
                return [...prevState,participantUser];
            })
            peer.on('open',(id)=>{
                const call = peer.call(callId, selfStream);
                
                call.on('stream', (remoteStream) => {
                    participantUser.ref.current.srcObject = remoteStream;
                })
            })
        });
        socket.on('candidateLeft',(data)=>{
            removeParticipant(data.email);
        })
    }
    
    const handleDisconnect = () =>{
        history.push("/meet");
    }
    useEffect(() => {
        if(!user)
        {
            history.push("/signin");
        }
        else{

            captureSelfVideo(selfStreamControl).then((stream) => {
                setSelfStream(stream);
                if(!called)
                {
                    addMe(stream);
                setCalled(true);
            }
        })
        setSelfRef(getSelfStream(selfStreamControl));
        return()=>{
            socket.emit("disconnectMe",{userId:user.payload.id,meetingId:meetingId,email:user.payload.email});
            socket.disconnect();
            for(let participant of participants)
            {
                participant.peer.disconnect();
            }
        }
    }
    }, []);

    return (
        <>
            <div className="video_display_wrapper">
                {participants.length ? participants.map((participant) => {
                    return (
                        <VideoDisplay videoRef={participant.ref} key={participant.email} self={false} />
                    )
                }) : null}
                <VideoDisplay videoRef={selfRef} self={true} />
            </div>
            <CallControl disconnect={handleDisconnect}/>
        </>
    )
}

export default VideoCallScreen;