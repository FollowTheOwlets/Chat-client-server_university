import fs from "fs";
import {MAN_BASE_PATH, MESSAGES_PATH} from "./const.js";

export const readDatabase = () => {
	return JSON.parse(fs.readFileSync(MAN_BASE_PATH, 'utf8'));
}

export const readMessages = () => {
	return JSON.parse(fs.readFileSync(MESSAGES_PATH, 'utf8'));
}

export const writeDatabase = (humansData, requestBody) => {
	const userLogin = JSON.parse(requestBody.toString()).data.login;
	const userPassword = JSON.parse(requestBody.toString()).data.password;
	humansData.push({"login": userLogin, "password": userPassword});
	fs.writeFileSync(MAN_BASE_PATH, JSON.stringify(humansData));
}
export const verification = (passwordInRequest, userPassword) => {
	return passwordInRequest === userPassword;
}

export const findHuman = (humansData, requestBody) => {
	return humansData.filter(hum => hum.login === JSON.parse(requestBody.toString()).data.login)[0] || [];
}

export const writeDatabaseNewPassword = (humansData, requestBody) => {
	const userLogin = JSON.parse(requestBody.toString()).data.login;
	const userPassword = JSON.parse(requestBody.toString()).data.new_password;
	humansData.push({"login": userLogin, "password": userPassword});
	fs.writeFileSync(MAN_BASE_PATH, JSON.stringify(humansData));
}


export const humansWithoutHuman = (humansData, requestBody) => {
	return humansData.filter(hum => hum.login !== JSON.parse(requestBody.toString()).data.login);
}

/*
module.exports = {
	humansWithoutHuman,
	writeDatabaseNewPassword,
	findHuman,
	verification,
	writeDatabase,
	readMessages,
	readDatabase
}*/
