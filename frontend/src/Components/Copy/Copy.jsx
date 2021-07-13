import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from '@material-ui/core/Button';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { MdContentCopy } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
export const Copy = () => {
    const meetingCode = useSelector((state)=>state.meet.meetingCode);
    const password = useSelector((state)=>state.meet.password);
    function MeetDetailsModal(props) {
        return (
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Meet Details
                    </Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <p>
                            <Form.Group>
                                <Form.Label>Meeting Code</Form.Label>
                                <p>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col" style={{ paddingLeft: "0px" }}>
                                                {props.meetingcode}
                                            </div>
                                            <div className="col col-sm-3">
                                                <CopyToClipboard text={props.meetingcode}>
                                                    <Button>
                                                        <MdContentCopy />
                                                    </Button>
                                                </CopyToClipboard>
                                            </div>
                                        </div></div>
                                </p>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <p>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col" style={{ paddingLeft: "0px" }}>
                                                {props.password}
                                            </div>
                                            <div className="col col-sm-3">
                                                <CopyToClipboard text={props.password}>
                                                    <Button>
                                                        <MdContentCopy />
                                                    </Button>
                                                </CopyToClipboard>
                                            </div>
                                        </div></div>
                                </p>
                            </Form.Group>
                        </p>
                    </Modal.Body>
                </Form>
            </Modal>
        );
    }
    const [meetdetailsmodalShow, setMeetDetailsModalShow] = React.useState(false);
    return (
        <div>
            <Button variant="contained" color="secondary" onClick={() => setMeetDetailsModalShow(true)}><DehazeIcon /></Button>
            <MeetDetailsModal
                password = {password}
                meetingcode = {meetingCode}
                show={meetdetailsmodalShow}
                onHide={() => setMeetDetailsModalShow(false)}
            />
        </div>
    )
}
