import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import logo from './logo.png'
import './header.css'
import Grid from '@material-ui/core/Grid';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import { Link } from "react-router-dom";
import Logout from '../Logout/Logout';
export const Header = (props) => {
    let headerStyle = {
        background: "#0f1c24"
    }

    return (
        <div style={headerStyle}>
            <Navbar className="py-4" expand="lg">
                <Link to="/">
                <Navbar.Brand>
                    <img
                        src={logo}
                        width="200"
                        height="50"
                        className="d-inline-block align-top"
                        alt=""
                        />
                </Navbar.Brand>
                </Link>
                {(props.page === "meet" ?
                        <Logout/>
                    : "")}
                {(props.page === "chat" ?
                    <div>
                        <Grid container spacing={2}>
                            <Grid item >
                                <Link to="/videocall">
                                    <button type="submit" className="btn btn-default" class="video-call-btn"><VideoCallIcon/></button>
                                </Link>
                            </Grid>
                            <Grid item>
                            <Link to="/meet">
                                    <button type="submit" className="btn btn-default" class="video-call-btn"><b>End chat</b></button>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Logout/>
                            </Grid>
                        </Grid>
                    </div>
                    : "")}
            </Navbar>
        </div>
    )
}