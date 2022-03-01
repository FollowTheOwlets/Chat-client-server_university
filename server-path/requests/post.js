import {findHuman, readDatabase, verification, writeDatabase} from "./fun-and-const/functions.js";

export const postReq = (request, response) => {
	let humansData = readDatabase();

	request.on('data', requestBody => {
		const human = findHuman(
			humansData,
			requestBody
		);


		if (human.length !== 0) {
			response.end(JSON.stringify(
				`verification${verification(JSON.parse(requestBody.toString()).data.password, human.password) ? " true" : " false - wrong password"}`)
			);
		} else {
			writeDatabase(humansData, requestBody);
			response.end(JSON.stringify("You are registered"));
		}
	});
}

/*
module.exports = {postReq}*/
