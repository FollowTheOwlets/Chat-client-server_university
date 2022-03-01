import cors from 'cors'
import express from 'express'
import {createServer} from "http";
import {Server} from "socket.io";
import {DELETE_PATH, GET_HUMAN_PATH, GET_MESSAGES_PATH, POST_PATH, PUT_PATH} from "./requests/fun-and-const/const.js";
import {getHumansRec, getMessagesRec} from "./requests/get.js";
import {deleteReq} from "./requests/delete.js";
import {notFind} from "./requests/notFind.js";
import {postReq} from "./requests/post.js";
import {putReq} from "./requests/put.js";
import {sendMessages} from "./sockets/send-message.js";

const HTTP_PORT = 5000;
const app = express();

app.use(cors());
app.get(GET_HUMAN_PATH, getHumansRec);
app.get(GET_MESSAGES_PATH, getMessagesRec);
app.post(POST_PATH, postReq);
app.delete(DELETE_PATH, deleteReq);
app.put(PUT_PATH, putReq);
app.use(notFind);

app.listen(HTTP_PORT, () => {
	console.log(`HTTP server listening on port ${HTTP_PORT}`);
})

//Server for sockets PORT : 4000
const SOCKET_PORT = 4000;
const httpServer = createServer();
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:3000",
		allowedHeaders: ["my-custom-header"],
		credentials: true
	}
});

io.on('connection', sendMessages);
httpServer.listen(SOCKET_PORT, () => {
	console.log(`Socket server listening on port ${SOCKET_PORT}`);
});