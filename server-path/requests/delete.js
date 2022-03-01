import fs from "fs";
import {MAN_BASE_PATH} from "./fun-and-const/const.js";
import {readDatabase, verification} from "./fun-and-const/functions.js";

export const deleteReq = (request, response) => {
	let humansData = readDatabase();

	request.on('data', requestBody => {

		const human = humansData.filter(
			hum => hum.login === JSON.parse(requestBody.toString()).login
		)[0] || [];

		if (human.length !== 0) {
			if (
				verification(
					JSON.parse(requestBody.toString()).password,
					human.password
				)
			) {
				const newHumansData = humansData.filter(
					hum => hum.login !== JSON.parse(requestBody.toString()).login
				);

				fs.writeFileSync(MAN_BASE_PATH, JSON.stringify(newHumansData));
				response.end(JSON.stringify("deleted"));

			} else {
				response.end(JSON.stringify("password wrong"));
			}
		} else {
			response.end(JSON.stringify("not human"),);
		}
	});
}

/*
module.exports = {deleteReq}*/
