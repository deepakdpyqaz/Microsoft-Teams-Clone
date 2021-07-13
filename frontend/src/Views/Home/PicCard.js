import React from 'react'
import Card from 'react-bootstrap/Card'
import meet from './meet.png'
import buttons from './buttons.png'

export const PicCard = () => {
    return (
        <div className="col-md-6 ml-0 pl-0 my-5">
            <Card className="my-3" style={{ width: "100%", height: "105%" }}>
                <Card.Body>
                    <Card.Img src={meet} style={{ width: "100%", height: "90%" }} />
                    <Card.Img className="center my-2" src={buttons} style={{ width: "20%", height: "10%" }} />
                </Card.Body>
            </Card>
        </div>
    )
}
