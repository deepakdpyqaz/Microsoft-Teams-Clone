import React, { useEffect } from 'react'
import './homebody.css'
import { Bottom } from '../../Components/Bottom/Bottom';
import { TextCard } from './TextCard.js'
import { PicCard } from './PicCard.js'
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import {login} from '../../Redux/slice/authSlice';

const HomeBody = () => {
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
            }).catch(()=>{})
        }
        else{
            history.push("/meet")
        }
    })
    return (
        <div>
            <div className="container">
                <div className="row">
                    <TextCard/>
                    <PicCard/>
            </div>
            </div>
            <div className="home">
            <div className="center my-5">
                <Bottom />
            </div>
            </div>
        </div>
    )
}
export default HomeBody;