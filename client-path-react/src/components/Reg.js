import React, {useRef} from 'react';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {post} from "./functions/Request";
import {login} from "./functions/Login";
import {checkPassword} from "./functions/CheckPassword";

const Reg = (props) => {

    const h_name = useRef();
    const h_id = useRef();
    const password = useRef();
    const repPassword = useRef();

    const authorisation = () => {
        if (checkPassword(password.current.value, repPassword.current.value)) {
            const name = h_name.current.value[0].toUpperCase() + h_name.current.value.slice(1);
            const id = h_id.current.value;
            post("reg", {id, name, password: password.current.value}, (response) => {
                if (response === "reg") {
                    alert("Такой пользователь уже зарегистрирован");
                } else {
                    login(id, password.current.value, name);
                    props.authorisation();
                }
            })
        }
    }
    return (
        <div className={"registration_page"}>
            <Button className={"button_reg_auth"} onClick={props.toAuthorisation} size="sm"
                    variant="danger">Authorisation</Button>

            <Form.Group className="mb-3" controlId="ID_control_reg">
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" placeholder="@000000" ref={h_id}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="name_control_reg">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Kitty" ref={h_name}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password_control_reg">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={password}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password_repeat_control_reg">
                <Form.Label>Repeat password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={repPassword}/>
            </Form.Group>

            <Button onClick={authorisation} size="sm" variant="secondary">Go</Button>
        </div>
    );
};

export default Reg;