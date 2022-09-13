import React, {useEffect, useRef, useState} from 'react';
import {del, post} from "./functions/Request";
import {Card} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import {getTime} from "./functions/GetTime";
import Button from "react-bootstrap/Button";
import Mail from "./Mail";

const Mails = (props) => {

    const [mails, setMails] = useState([]);
    const type = props.mailsType;

    useEffect(() => {
        if (type === "Incoming"){
            post("incoming_messages", {id: localStorage.getItem("id")}, (response) => {
                setMails(response);
            });
        }
        else{
            post("outgoing_messages", {id: localStorage.getItem("id")}, (response) => {
                setMails(response);
            });
        }
    }, [type, mails])

    return (
        <div className={"mails-block"}>
            {mails.map(mail => {
                return (
                    <Mail show={props.show} setShow={props.setShow} type={type} key={mail.ui} mail={mail}/>
                )
            })}
        </div>);
};

export default Mails;