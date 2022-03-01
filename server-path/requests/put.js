import {readDatabase} from "./fun-and-const/functions.js";


export const putReq = (request, response) => {
	let humansData = readDatabase();

	request.on('data', requestBody => {

		const human = findHuman(
			humansData,
			requestBody
		);


		if (human.length !== 0) {
			if (
				verification(
					JSON.parse(requestBody.toString()).data.password,
					human.password
				)
			) {
				const newHumansData = humansWithoutHuman(humansData, requestBody);

				const regex = /^[A-Za-z0-9]+$/;

				const password = JSON.parse(requestBody.toString()).data.new_password

				console.log(password)

				if (!regex.test(password)) {
					response.end(JSON.stringify("Password very simple."));
				} else {
					if (password.length < 10) {
						response.end(JSON.stringify("The password must be longer than 10 characters"));
					} else if (password.search(/[a-z]/) < 0) {
						response.end(JSON.stringify("The password must contain at least one lowercase letter"));
					} else if (password.search(/[A-Z]/) < 0) {
						response.end(JSON.stringify("The password must contain at least one uppercase letter"));
					} else if (password.search(/[0-9]/i) < 0) {
						response.end(JSON.stringify("The password must contain at least one number"));
					} else {
						writeDatabaseNewPassword(newHumansData, requestBody);
						response.end(JSON.stringify("change password"));
					}
				}
			} else {
				response.end(JSON.stringify("password wrong"));
			}
		} else {
			response.end(JSON.stringify("not human"));
		}
	});
}

/*
module.exports = {putReq}*/
