import React, {useRef} from 'react';
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import {post} from "./functions/Request";
import {login} from "./functions/Login";

const Auth = (props) => {

    const h_id = useRef();
    const password = useRef();

    const authorisation = () => {
        const id = h_id.current.value;

        post("login", {id, password: password.current.value}, (response) => {
            if (response === "Error id") {
                alert("Такого пользователя не найдено");
            } else if (response === "Error password") {
                alert("Неверный пароль");
            } else {
                post("get_name", {id}, (response) => {
                    login(id, password.current.value, response);
                    props.authorisation();
                })
            }
        })
    }

    return (
        <div className={"registration_page"}>
            <Button className={"button_reg_auth"} onClick={props.toRegistration} size="sm"
                    variant="danger">Registration</Button>

            <Form.Group className="mb-3" controlId="ID_control_auth">
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" placeholder="@000000" ref={h_id}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password_control_auth">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={password}/>
            </Form.Group>

            <Button onClick={authorisation} size="sm" variant="secondary">Go</Button>
        </div>
    );
};

export default Auth;