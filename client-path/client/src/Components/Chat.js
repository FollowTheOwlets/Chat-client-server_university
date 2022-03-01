import React, {useEffect, useState} from 'react';
import {MDBIcon} from 'mdb-react-ui-kit';
import {Button, Form, InputGroup} from "react-bootstrap";

const Chat = (props) => {
	const [text, setText] = useState();
	const [messages, setMessages] = useState(JSON.parse(localStorage.getItem("messages")));

	const socket = props.socket;
	const senderName = props.senderName;

	const addMessageToRoom = ({senderName, text}) => {
		const newMessages = [...messages, {senderName, text}];
		setMessages(newMessages);
		localStorage.setItem("messages", JSON.stringify(newMessages));
	}

	useEffect(() => {
		if (socket == null || socket === "undefined") return

		socket.on('receive-message', addMessageToRoom)

		return () => socket.off('receive-message')
	}, [socket, addMessageToRoom, messages])


	const sendMessage = (event) => {
		event.preventDefault();
		if (text.toString().trim().length !== 0) {
			const textMessage = text.toString().trim();
			alert(textMessage)
			socket.emit('send-message', {senderName, "text": textMessage})
			addMessageToRoom({senderName, "text": textMessage})
		} else {
			alert("Сообщение пустое")
		}
		setText("");
	}

	return (
		<div style={{
			width: "100%",
			height: "100%",
			position: "absolute",
			bottom: "0",
			flexDirection: "column",
			justifyContent: "flex-end",
		}} className={"d-flex"}>
			<div style={{width: "100%", maxHeight: "100vh", overflow: "auto",}}>
				<div className={"d-flex"}
					 style={{
						 width: "100%",
						 flexDirection: "column",
						 justifyContent: "center",
						 padding: "30px",
					 }}>
					{messages && messages.length === 0 ?
						"" :
						messages.map(
							(message, index) => {

								const fromMe = message.senderName === senderName;
								const name = message.senderName;
								const text = message.text;


								return (
									<div
										style={{maxWidth: "40vh"}}
										key={index}
										className={`my-1 d-flex flex-column ${fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
									>
										<div
											className={`rounded px-2 py-1 ${fromMe ? 'bg-dark text-white' : 'border'}`}>
											{text}
										</div>
										<div className={`text-muted small ${fromMe ? 'text-right' : ''}`}>
											{(fromMe ? 'You' : name)}
										</div>
									</div>
								)
							})
					}

				</div>

			</div>

			<Form onSubmit={sendMessage} style={{width: "100%",}}>
				<Form.Group className="m-2">
					<InputGroup>
						<Form.Control
							as="textarea"
							required
							value={text}
							onChange={e => setText(e.target.value)}
							style={{height: '75px', resize: 'none'}}
						/>
						<Button type="submit" variant="dark">
							<MDBIcon fas className={"fa-lg"} icon="angle-double-up" style={{color: "white",}}/>
						</Button>
					</InputGroup>
				</Form.Group>
			</Form>
		</div>
	);
};

export default Chat;