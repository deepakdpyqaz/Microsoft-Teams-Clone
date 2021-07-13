import React,{useEffect} from 'react';
import { Bottom } from '../../Components/Bottom/Bottom'
import './signbody.css';
import { SignCard } from './SignCard.js';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import {login} from '../../Redux/slice/authSlice';
export const SignBody = () => {
    let user = useSelector((state)=>state.auth.user);
    let history = useHistory();
    const dispatch = useDispatch();
    useEffect(()=>{
        if(!user)
        {
            const token = reactLocalStorage.get("Authorization");
            axios.post("/auth/jwt",{token}).then((res)=>{
                dispatch(login(res.data));
                reactLocalStorage.set('Authorization',res.data.token);
                axios.defaults.headers.common['Authorization'] = res.data.token;
                history.push("/meet");
            }).catch()
        }   
        else{
            history.push("/meet");
        }
    })

    return (
        <div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col"></div>
                    <SignCard/>
                    <div className="col"></div>
                </div>
            </div>
            <div className="center my-5">
                <Bottom />
            </div>
        </div>
    )
}
