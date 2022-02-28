import React, {useRef, useState} from 'react'
import {Form, Button, Container, Alert} from 'react-bootstrap'
import  axios  from 'axios'


export default function Login(props) {

    const loginRef = useRef();
    const passwordRef = useRef();
    const [stateUserPasswordWrong,setStateUserPasswordWrong] = useState("");
    const [stateUserNameWrong,setStateUserNameWrong] = useState("");
    const [alertName,setAlertName] = useState(false);
    const [alertPassword,setAlertPassword] = useState(false);

    const handleSubmit = (event) =>{
        event.preventDefault();

        const login = loginRef.current.value.trim();
        const password = passwordRef.current.value.trim();

        const regexpPassword = /^[A-Za-z0-9]+$/;

        let wrong = 0;

        if(!regexpPassword.test(password)) {
            setStateUserPasswordWrong("Пароль должен содержать больше 10 символов только латинские заглавные и прописные буквы, цифры.");
            setAlertPassword(true);
            wrong++;
        }else{
            wrong++;
            setAlertPassword(true);
            if(password.length<10){
                setStateUserPasswordWrong("Пароль должен содержать больше 10 символов.");
            }else if (password.search(/[a-z]/) < 0) {
                setStateUserPasswordWrong("Ваш пароль должен содержать хотя бы одну строчную букву");
            }else if (password.search(/[A-Z]/) < 0) {
                setStateUserPasswordWrong("Ваш пароль должен содержать хотя бы одну заглавную букву");
            }else if (password.search(/[0-9]/i) < 0) {
                setStateUserPasswordWrong("Ваш пароль должен содержать хотя бы одну цифру");
            }else{
                setAlertPassword(false)
                wrong--;
            }

        }

        if(login.split(" ").length > 1 || login.length ==0 ) {
            setStateUserNameWrong("Имя не должно содержать пробелов");
            setAlertName(true);
            wrong++;
        }else{
            setAlertName(false);
        }

        if( wrong === 0 ) {
            axios.post(`http://localhost:5000/join`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: {login, password}
            }).then(res => {
                if (res.data !== "verification false - wrong password") {
                    localStorage.setItem("myLogin", login);
                    localStorage.setItem("myPassword", password);

                    axios.get(`http://localhost:5000/messages`, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        }
                    }).then(res => {
                        localStorage.setItem("messages", JSON.stringify(res.data));
                        setTimeout(props.set(login), 2000)
                    })
                } else {
                    setAlertPassword(true);
                }
            })
        }
    }

    return (
        <Container className="align-items-center d-flex" style={{ height: '100vh' }}>
            <Form onSubmit={handleSubmit} className="w-100">

                <Form.Group>
                    <Form.Label>Login</Form.Label>
                    <Form.Control type="text" ref={loginRef} required />
                </Form.Group>

                { alertName ? <Alert className={"alert-danger"}>{stateUserNameWrong}</Alert> : ""}

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>

                { alertPassword ? <Alert className={"alert-danger"}>{stateUserPasswordWrong}</Alert> : ""}

                <Button type="submit" className="mr-2" style={{marginTop:"10px"}} variant="dark"  >Войти</Button>
            </Form>
        </Container>
    );
}