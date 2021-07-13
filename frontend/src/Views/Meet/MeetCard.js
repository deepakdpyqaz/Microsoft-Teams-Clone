import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import createmeet from './createmeet.jpeg';
import joinmeet from './joinmeet.webp';
import Modal from 'react-bootstrap/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import {Link, useHistory} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import {setMeeting,setParticipants} from '../../Redux/slice/meetSlice';
import { MdContentCopy } from "react-icons/md";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: 2000,
        color: '#fff',
    },
}));

function CreateMeetModal(props) {
    
    const classes = useStyles();
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Backdrop className={classes.backdrop} open={props.isloading}>
            <CircularProgress color="inherit" />
        </Backdrop>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create Meet
                </Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>
                    <p>{props.message}</p>
                    <p>
                        <Form.Group>
                            <Form.Label>Meet Code</Form.Label>
                            <Grid container>
                                <Grid item xs={10}>
                                    <p>{props.meetingDetails.meetingCode}</p>
                                </Grid>
                                <Grid xs={2}>
                                    <CopyToClipboard text={props.meetingDetails.meetingCode}>
                                        <Button>
                                            <MdContentCopy />
                                        </Button>
                                    </CopyToClipboard>
                                </Grid>
                            </Grid>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Grid container>
                                <Grid item xs={10}>
                                    <p>{props.meetingDetails.password}</p>
                                </Grid>
                                <Grid xs={2}>
                                    <CopyToClipboard text={props.meetingDetails.password}>
                                        <Button>
                                            <MdContentCopy />
                                        </Button>
                                    </CopyToClipboard>
                                </Grid>
                            </Grid>
                        </Form.Group>
                    </p>
                </Modal.Body>
                <Modal.Footer id="modalbuttons">
                   <Link to="/chat"><button type="submit" className="btn btn-modal">Start Chat</button></Link>
                   <Link to="/videocall"> <button type="submit" className="btn btn-modal">Start Meet</button></Link>
                </Modal.Footer>
            </Form>
        </Modal>    
    );
}

function JoinMeetModal(props) {
    const [meetingDetails,setMeetingDetails] = React.useState({meetingCode:"",password:""});
    const [message,setMessage] = React.useState("");
    const history = useHistory();
    const handleChange=(e)=>{
        setMeetingDetails((prevState)=>{
            return {
                ...prevState,
                [e.target.name]:e.target.value
            }
        })
    }
    const dispatch = useDispatch();
    const handleSubmit=(mode)=>{
        axios.post("/call/join",meetingDetails).then((res)=>{
            if(res.data.status==='success'){
                dispatch(setMeeting({meetingCode:meetingDetails.meetingCode,password:meetingDetails.password,meetingId:res.data.meetingId}));
                history.push("/"+mode);
            }
            else{
                setMessage(res.data.message);
            }
        }).catch((err)=>{
            if(err.response.data.message)
            {
                setMessage(err.response.data.message);
            }
            else{
                setMessage(err.message);
            }
        })
    }
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Join Meet
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={(e)=>{e.preventDefault()}}>
                <Modal.Body>
                    <p>{message}</p>
                    <p>
                        <Form.Group>
                            <Form.Label>Meet Code</Form.Label>
                            <Form.Control required type="text" name="meetingCode" value={meetingDetails.meetingCode} placeholder="Enter Meet Code" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" name="password" value={meetingDetails.password} placeholder="Enter Password" onChange={handleChange}/>
                        </Form.Group>
                    </p>
                </Modal.Body>
                <Modal.Footer id="modalbuttons">
                    <button className="btn btn-modal" onClick={(e)=>{
                        handleSubmit("chat");
                    }}>Start Chat</button>
                    <button className="btn btn-modal" onClick={(e)=>{
                        handleSubmit("videocall");
                    }}>Start Meet</button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

const MeetCard = () => {
    const [createmodalShow, setCreateModalShow] = React.useState(false);
    const [joinmodalShow, setJoinModalShow] = React.useState(false);
    const [meetingDetails,setMeetingDetails] = React.useState({meetingCode:null,password:null});
    const [isloading,setisloading] = React.useState(false);
    const [message,setMessage] = React.useState("");
    const user = useSelector((state)=>state.auth.user);
    const dispatch = useDispatch();
    function createMeet(){
        setisloading(true);
        setMeetingDetails({meetingCode:null,password:null});
        setCreateModalShow(true);
        axios.get("/call/create").then((res)=>{
            setMeetingDetails({meetingCode:res.data.meetingCode,password:res.data.password});
            setisloading(false);
            setMessage(res.data.message);
            dispatch(setMeeting({meetingCode:res.data.meetingCode,password:res.data.password,meetingId:res.data.meetingId}));

        }).catch((err)=>{
            setisloading(false);
            setMessage(err.message);
        })

    }
    return (
        <>
            <div className="col-md-6">
                <Card className="mb-3" style={{ width: "100%", height: "100%" ,background:"rgb(3,31,48)" ,"color":"#FFF"}}>
                    <Card.Body>
                        <Card.Img src={createmeet} />
                        <p align="center">
                            <button type="button" onClick={createMeet} className="btn btn-default">Create Meet</button>
                            <CreateMeetModal
                                meetingDetails={meetingDetails}
                                show={createmodalShow}
                                isloading={isloading}
                                message={message}
                                onHide={() => setCreateModalShow(false)}
                            />
                        </p>
                    </Card.Body>
                </Card>
            </div>
            <div className="col-md-6">
                <Card className="mb-3" style={{ width: "100%", height: "100%" ,background:"rgb(3,31,48)" ,"color":"#FFF"}}>
                    <Card.Body>
                        <Card.Img src={joinmeet} />
                        <p align="center">
                            <button type="button" onClick={() => setJoinModalShow(true)} className="btn btn-default">Join Meet</button>
                            <JoinMeetModal
                                show={joinmodalShow}
                                onHide={() => setJoinModalShow(false)}
                            />
                        </p>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}
export default MeetCard;
