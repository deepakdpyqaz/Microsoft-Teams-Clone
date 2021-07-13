import React from 'react'
import './button.css'

const Button = (props) => {
    return (
        <button type={props.type} className="btn btn-default">{props.title}</button>
    )
}
Button.defaultProps = {
    type: "button"
  }
export {Button};
