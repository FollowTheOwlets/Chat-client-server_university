import React from 'react';
import Button from "react-bootstrap/Button";
import {del} from "./functions/Request";
import store from "./store/Store";

const Menu = (props) => {
    const handleOpen = () => {
        store.dispatch({type: "normal"});
        props.setShow(true)
    };

    return (
        <>
            <div className={"card-header-title"}>Cooperative Email</div>
            <div className={"second-header-block"}>
                <span id={"id-in-menu"}>your id: {localStorage.getItem("id")}</span>
                <div className={"menu-buttons"}>
                    <Button variant="secondary" size="sm" onClick={handleOpen}>New</Button>{' '}
                    <Button variant="secondary" size="sm" onClick={
                        () => {
                            del(`delete_${props.mailsType === "Incoming" ? "incoming" : "outgoing"}_all`, {id: localStorage.getItem("id")}, () => {
                            })
                        }
                    }>
                        Delete All
                    </Button>{' '}
                    <Button variant="secondary" size="sm" onClick={
                        () => {
                            props.toAuthorisation();
                            localStorage.clear();
                        }
                    }>
                        Exit
                    </Button>{' '}
                </div>
            </div>

        </>

    );
};

export default Menu;