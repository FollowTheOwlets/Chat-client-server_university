import React, {useState} from 'react';
import {Card} from "react-bootstrap";
import Menu from "./Menu";
import UnderMenu from "./UnderMenu";
import Mails from "./Mails";
import NewMessage from "./NewMessage";

const Interface = (props) => {

    const [show, setShow] = useState(false);

    const INCOMING = "Incoming";
    const OUTGOING = "Outgoing";

    const [mailsType, setMailsType] = useState(INCOMING);

    const setIncoming = () => {
        setMailsType(INCOMING);
    }
    const setOutgoing = () => {
        setMailsType(OUTGOING);
    }

    return (
        <>
            <Card>
                <Card.Header>
                    <Menu mailsType={mailsType} setShow={setShow} toAuthorisation={props.toAuthorisation}/>
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        <UnderMenu mailsType={mailsType} setIncoming={setIncoming} setOutgoing={setOutgoing}
                                   INCOMING={INCOMING} OUTGOING={OUTGOING}/>
                    </Card.Title>
                    <Mails show={show} setShow={setShow} mailsType={mailsType}/>
                </Card.Body>
            </Card>
            <NewMessage show={show} setShow={setShow}/>
        </>

    );
};

export default Interface;
