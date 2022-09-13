import React, {useRef} from 'react';
import {Modal} from "react-bootstrap";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {sendMessage} from "./functions/SendMessage";
import store from "./store/Store";

const NewMessage = (props) => {
    const text_message = useRef();
    const recipients_for_message = useRef();
    const title_message = useRef();
    const applyData = store.getState();
    const send = () => {
        const flag = sendMessage(
            recipients_for_message.current.value.split(", "),
            title_message.current.value,
            text_message.current.value,
            text_message,
            title_message
        );
        if (flag) {
            recipients_for_message.current.value = "";
            title_message.current.value = "";
            text_message.current.value = "";
            props.setShow(false);
        }
    }
    const handleClose = () => props.setShow(false);


    return (
        <>
            <Modal show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="ID_control">
                        <Form.Label>ID:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter ID"
                            ref={recipients_for_message}
                            defaultValue={applyData.id}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="title_control">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            ref={title_message}
                            defaultValue={applyData.title}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="text_control">
                        <Form.Label>Message:</Form.Label>
                        <Form.Control as="textarea" placeholder="Your message..." ref={text_message}/>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={send}>
                        Send
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NewMessage;