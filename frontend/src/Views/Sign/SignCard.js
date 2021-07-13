import React,{useState} from 'react'
import Card from 'react-bootstrap/Card'
import { Button } from '../../Components/Button/Button.js'
import Form from 'react-bootstrap/Form'
import { useLocation,useHistory } from 'react-router'
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import {login} from '../../Redux/slice/authSlice';
import { useSelector, useDispatch } from 'react-redux';
export const SignCard = (props) => {
    const [userDetails,setUserDetails] = useState({email:"",password:"",name:""});
    let location = useLocation();
    let history = useHistory();
    const dispatch = useDispatch();
    let mode = location.pathname.substring(1);
    let user = useSelector((state)=> state.auth.user);
    if(user!=null)
    {
        history.push("/meet");
    }
    const handleFormChange = (e)=>{
        setUserDetails((prevData)=>{
            return{
                ...prevData,
                [e.target.name]:e.target.value
            }
        })
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        let formUrl = '/auth/' + (mode==='signup'?'signup':'login');
        axios.post(formUrl,userDetails).then((res)=>{
            if(mode==='signup'){
                alert("Account created Successfully");
                history.push("/signin");
            }
            else{
                dispatch(login(res.data));
                reactLocalStorage.set('Authorization',res.data.token);
                axios.defaults.headers.common['Authorization'] = res.data.token;
                history.push("/meet");
            }
        }).catch((err)=>{
            alert(err.message);
        })
    }
    return (
        <div className="col-md-6 my-5">
            <Card className="my-3" style={{ width: "100%", height: "105%",background:"rgb(3,31,48)" ,"color":"#FFF"}}>
                <Form onSubmit={handleSubmit}>
                    <Card.Body>
                        <Card.Title className="text-center" style={{background:"rgb(3,31,48)","color":"#FDFFBC"}} id="title">Microsoft Teams</Card.Title>
                        <Card.Text as="div" id="text">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control required type="email" name="email" value={userDetails.email} onChange={handleFormChange} placeholder="Enter Email" />
                            </Form.Group>
                            {(mode === "signup" ?
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required type="text" name="name" value={userDetails.name} onChange={handleFormChange} placeholder="Enter Name" />
                                </Form.Group>
                                : "")}
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required type="password" name="password" value={userDetails.password} onChange={handleFormChange} placeholder="Enter Password" />
                            </Form.Group>
                        </Card.Text>
                        <p align="center">
                            {(mode === "signup" ? <Button type="submit" disabled={!(userDetails.email && userDetails.password)} title="Sign up" /> : <Button type="submit" disabled={!(userDetails.email && userDetails.password)} title="Sign in" />)}
                        </p>
                    </Card.Body>
                </Form>
            </Card>
        </div>
    )
}