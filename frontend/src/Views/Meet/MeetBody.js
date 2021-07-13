import React from 'react'
import { Bottom } from '../../Components/Bottom/Bottom.js'
import './meetbody.css'
import MeetCard from './MeetCard.js'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
export const MeetBody = () => {
    const user = useSelector((state)=>state.auth.user);
    const history = useHistory();
    if(!user){
        history.push("/signin");
    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="text-center my-5" style={{background:"rgb(3,31,48)","color":"#FDFFBC"}} id="title">
                            Welcome to Microsoft Teams
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <MeetCard />
                </div>
            </div>
            <div className="center my-4">
                <Bottom />
            </div>
        </div>
    )
}
