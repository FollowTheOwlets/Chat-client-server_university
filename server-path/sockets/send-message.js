import {readDatabase, readMessages} from "../requests/fun-and-const/functions.js";
import {MESSAGES_PATH} from "../requests/fun-and-const/const.js";
import fs from "fs";

export const sendMessages = (socket) => {
	const id = socket.handshake.query.id
	socket.join(id)
	console.log(`${id}  connected`)
	socket.on('send-message', ({senderName, text}) => {

		const messages = readMessages();
		const humans = readDatabase();
		const newMessages = [...messages, {senderName, text}];
		fs.writeFileSync(MESSAGES_PATH, JSON.stringify(newMessages));
		humans.forEach(human => {

			if (human.login !== senderName) {
				socket.broadcast.to(human.login).emit('receive-message', {
					senderName,
					text
				})
			}
		})
	})
}
/*module.exports = {sendMessages}*/
