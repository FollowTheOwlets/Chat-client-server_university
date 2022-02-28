import React from 'react';
import {Button, ButtonGroup, DropdownButton} from "react-bootstrap";
import axios from "axios";

const HttpButtons = (props) => {
    const whoInRoom = () =>{
        axios.get(`http://localhost:5000/humans`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(res => {
            let humans="";
            for(let human of res.data)
                humans+= `${human.login}, `;
            alert(humans);
        })
    }

    const changePassword = () =>{
        const login = localStorage.getItem("myLogin");
        const password = localStorage.getItem("myPassword");
        const new_password = prompt("Впишите новый пароль?");

        axios.put(`http://localhost:5000/change`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {login, password,new_password}
        }).then(res => {
            alert(JSON.stringify(res.data))
            localStorage.setItem("myPassword",new_password);

        })
    }

    const deleteFromRoom = () =>{
        const login = localStorage.getItem("myLogin");
        const password = localStorage.getItem("myPassword");
        axios.delete(`http://localhost:5000/delete`, {
        data: {login, password}
        }).then(res => {
            alert("Увидимся!")
            localStorage.removeItem('myLogin');
            localStorage.removeItem('myPassword');
            localStorage.removeItem('messages');
            props.set(null)
        })
    }

    return (
                <DropdownButton as={ButtonGroup} title="Действия"  variant="info" id="sm-nested-dropdown"
                >
                    <Button size="sm" variant="info" onClick={whoInRoom}>Кто есть в комнате?</Button>
                    <Button size="sm"  variant="info" onClick={changePassword}>Поменять пароль</Button>
                    <Button size="sm" variant="info" onClick={deleteFromRoom }>Удалиться из комнаты</Button>
                </DropdownButton>
    );
};

export default HttpButtons;