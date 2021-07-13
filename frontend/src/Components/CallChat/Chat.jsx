import React from 'react';
import Time from 'react-time';
import "./chat.css";
export const Chat = (props) => {
    let time = new Date(props.time);
    const classList = [props.messageClass];
    if(props.self)
    {
        classList.push("selfChat");
    }
    
    return (
        <div className={classList.join(" ")}>
            <p className="text-left" className="name" style={{ fontSize: "10px",margin:"0px",padding:"5px" }}>
                    {props.self?"You":props.name}
                </p>
            <div className="message">
                <p className="textmessage">
                    {props.chat}
                </p>
            </div>
            <div>
                <p className="text-right" className="time" style={{ fontSize: "10px" ,margin:"0px"}}>
                    <Time value={time} format="HH:mm" />
                </p>
            </div>
        </div>
    )
}