import {DELETE_PATH, GET_HUMAN_PATH, GET_MESSAGES_PATH, POST_PATH, PUT_PATH} from "./fun-and-const/const.js";

export const notFind = (request, response) => {
	request.url !== GET_HUMAN_PATH &&
	request.url !== GET_MESSAGES_PATH &&
	request.url !== DELETE_PATH &&
	request.url !== POST_PATH &&
	request.url !== PUT_PATH &&
	response.end(JSON.stringify("Url not found"));
}

/*
module.exports = {notFind}*/
