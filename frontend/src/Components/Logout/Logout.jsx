import React,{useState} from 'react';
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
import { Link,useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './logout.css';
import {logout} from '../../Redux/slice/authSlice';
import { clearData } from '../../Redux/slice/meetSlice';
import { clearMessages } from '../../Redux/slice/chatSlice';
import { reactLocalStorage } from 'reactjs-localstorage';

const Logout = () => {
    const user = useSelector((state)=>state.auth.user);
    let displayName = "";
    if(user)
    {
        displayName = user.payload.name;
    }
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLogoutVisible,setIsLogoutVisible] = useState(false);
    const toggleLogoutVisibility = () =>{
        setIsLogoutVisible(!isLogoutVisible);
    }
    const logoutHandle = () => {
        dispatch(logout());
        dispatch(clearData());
        dispatch(clearMessages());
        reactLocalStorage.remove("Authorization");
        history.push("/")
    }
    return (
        <div id="logoutWrapper" onClick={toggleLogoutVisibility}>
            <InitialsAvatar id="avatar" name={displayName} />
            {
                isLogoutVisible ?
                    <button onClick={logoutHandle} className="btn btn-default" id="logout"><b>Logout</b></button>
                : null
            }
        </div>

    )
}
export default Logout;