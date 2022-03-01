import {readDatabase, readMessages} from "./fun-and-const/functions.js"

export const getMessagesRec = (request, response) => {
	let messagesData = readMessages();
	response.end(JSON.stringify(messagesData));
}

export const getHumansRec = (request, response) => {
	//Все данные с GET запроса хранятся в url.parse(request.url, true).query
	let humansData = readDatabase();
	response.end(JSON.stringify(humansData));
}

/*
module.exports = {getMessagesRec, getHumansRec}*/
