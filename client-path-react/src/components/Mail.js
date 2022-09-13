import React, {useRef, useState} from 'react';
import CardHeader from "react-bootstrap/CardHeader";
import {getTime} from "./functions/GetTime";
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {del, post} from "./functions/Request";
import store from "./store/Store";

const Mail = (props) => {
    const mail = props.mail;
    const type = props.type;
    const [read, setRead] = useState(false);
    const ref = useRef();
    return (
        <Card ref={ref} className={`message ${!mail.check && type === "Incoming" ? "text-bg-dark" : ""}`}>
            <CardHeader>
                <div className={"time-of-message"}>
                    {getTime(mail.time)}
                </div>
                <div className={"sender-block"}>
                    {
                        type === "Incoming" ?
                            <>
                                <span className={"from-span"}>
                                    from:
                                </span>
                                <div className={"sender-of-message"}>
                                    {mail.sender}
                                </div>
                            </>
                            :
                            <>
                                <span className={"from-span"}>
                                    to:
                                </span>
                                <div className={"sender-of-message"}>
                                    {mail.recipient_name}
                                </div>
                            </>
                    }
                </div>
            </CardHeader>
            <Card.Body>
                <Button variant="secondary" className={"btn-apply"} onClick={() => {
                    store.dispatch({type: "apply", id: mail.id, title: `Apply for [${mail.title}]`});
                    props.setShow(true);
                }}>
                    Apply
                </Button>
                <span className={"btn btn-close"} onClick={() => {
                    if (type === "Incoming")
                        del("del_incoming_message", {ui: mail.ui, id: mail.recipient}, () => {
                        })
                    else {
                        del("del_outgoing_message", {ui: mail.ui, id: mail.id}, () => {
                        })
                    }
                }
                }/>
                <div className={"title-block"}>
                    <span className={"title-span"}>
                            Title:
                    </span>
                    <div className={"title-of-message"}>
                        {mail.title}
                    </div>
                </div>
                {
                    read ?
                        <p className={"text-of-message"}>
                            {mail.text}
                        </p> :
                        mail.check === false && type === "Incoming" ?
                            <Button variant="secondary" onClick={
                                () => {
                                    mail.check = true;
                                    setRead(true);
                                    post("read", {ui: mail.ui, id: mail.recipient}, () => {
                                    });
                                }
                            }>
                                Read
                            </Button> :
                            <Button variant="secondary" onClick={
                                () => {
                                    setRead(true);
                                }
                            }>
                                Read
                            </Button>
                }
            </Card.Body>
        </Card>
    );
};

export default Mail;