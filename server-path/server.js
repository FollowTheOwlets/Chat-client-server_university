const http = require('http');
const { parse } = require('querystring');
const fs = require('fs');
const cors = require('cors')
const express = require('express');
const app = express();
const {Server} = require("socket.io");
const {createServer} = require("http");


const PORT = 5000;
const GET_HUMAN_PATH = '/humans';
const GET_MESSAGES_PATH= '/messages';
const DELETE_PATH = '/delete';
const POST_PATH = '/join';
const PUT_PATH = '/change';
const MAN_BASE_PATH = './man.json';
const MESSAGES_PATH = './messages.json';

app.use(cors());

app.use((request, response) => {response.writeHead(200, {"Access-Control-Allow-Origin" : "*"});
    console.log(`server worked on ${PORT}`);

    if (request.method === 'GET' && request.url === GET_HUMAN_PATH) {
            //Все данные с GET запроса хранятся в url.parse(request.url, true).query
            let humansData = readDatabase();
            response.end(JSON.stringify(humansData));
    }else if (request.method === 'GET' && request.url === GET_MESSAGES_PATH) {
            //Все данные с GET запроса хранятся в url.parse(request.url, true).query
            let messagesData = readMessages();
            response.end(JSON.stringify(messagesData));
    }else if (request.method === 'POST' && request.url === POST_PATH){
            let humansData = readDatabase();

            request.on('data', requestBody => {
                const human = findHuman(
                    humansData,
                    requestBody
                );


                if(human.length !==0){
                    response.end(JSON.stringify(
                        `verification${verification(JSON.parse(requestBody.toString()).data.password,human.password) ? " true" :  " false - wrong password"}`)
                    );
                }else{
                    writeDatabase(humansData,requestBody);
                    response.end(JSON.stringify("You are registered"));
                }
            });
    }else if (request.method === 'DELETE' && request.url === DELETE_PATH){
        let humansData = readDatabase();

        request.on('data', requestBody => {

            const human = humansData.filter(
                hum => hum.login === JSON.parse(requestBody.toString()).login
            )[0] || [];

            if(human.length !==0){
                if(
                    verification(
                        JSON.parse(requestBody.toString()).password,
                        human.password
                    )
                ){
                    const newHumansData = humansData.filter(
                        hum => hum.login !== JSON.parse(requestBody.toString()).login
                    );

                    fs.writeFileSync(MAN_BASE_PATH,  JSON.stringify(newHumansData));
                    response.end(JSON.stringify("deleted"));

                }else{
                    response.end(JSON.stringify("password wrong"));
                }
            }else{
                response.end(JSON.stringify("not human"),);
            }
        });
    }else if (request.method === 'PUT' && request.url === PUT_PATH){
        let humansData = readDatabase();

        request.on('data', requestBody => {

            const human = findHuman(
                humansData,
                requestBody
            );


            if(human.length !==0){
                if(
                    verification(
                        JSON.parse(requestBody.toString()).data.password,
                        human.password
                    )
                ){
                    const newHumansData = humansWithoutHuman(humansData,requestBody);

                    const regex = /^[A-Za-z0-9]+$/;

                    const password = JSON.parse(requestBody.toString()).data.new_password

                    console.log(password)

                    if(!regex.test(password)) {
                        response.end(JSON.stringify("Password very simple."));
                    }else{
                        if(password.length<10){
                            response.end(JSON.stringify("The password must be longer than 10 characters"));
                        }else if (password.search(/[a-z]/) < 0) {
                            response.end(JSON.stringify("The password must contain at least one lowercase letter"));
                        }else if (password.search(/[A-Z]/) < 0) {
                            response.end(JSON.stringify("The password must contain at least one uppercase letter"));
                        }else if (password.search(/[0-9]/i) < 0) {
                            response.end(JSON.stringify("The password must contain at least one number"));
                        }else{
                            writeDatabaseNewPassword(newHumansData,requestBody);
                            response.end(JSON.stringify("change password"));
                        }

                    }
                }else{
                    response.end(JSON.stringify("password wrong"));
                }
            }else{
                response.end(JSON.stringify("not human"));
            }
        });
    }else{
        response.end(JSON.stringify("url or method not found"));
    }

}).listen(PORT);

const readDatabase = () => {
    return JSON.parse(fs.readFileSync(MAN_BASE_PATH, 'utf8'));
}

const readMessages = () => {
    return JSON.parse(fs.readFileSync(MESSAGES_PATH, 'utf8'));
}

const writeDatabase = (humansData,requestBody) => {
    const userLogin = JSON.parse(requestBody.toString()).data.login;
    const userPassword = JSON.parse(requestBody.toString()).data.password;
    humansData.push({"login":userLogin,"password":userPassword});
    fs.writeFileSync(MAN_BASE_PATH,  JSON.stringify(humansData));
}

const writeDatabaseNewPassword = (humansData,requestBody) => {
    const userLogin = JSON.parse(requestBody.toString()).data.login;
    const userPassword = JSON.parse(requestBody.toString()).data.new_password;
    humansData.push({"login":userLogin,"password":userPassword});
    fs.writeFileSync(MAN_BASE_PATH,  JSON.stringify(humansData));
}

const verification = (passwordInRequest,userPassword) => {
    return passwordInRequest === userPassword;
}

const findHuman = (humansData,requestBody) =>{
    return humansData.filter(hum => hum.login === JSON.parse(requestBody.toString()).data.login)[0] || [];
}

const humansWithoutHuman = (humansData,requestBody) =>{
    return humansData.filter(hum => hum.login !== JSON.parse(requestBody.toString()).data.login);
}


const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

httpServer.listen(4000);

io.on('connection',socket => {
    const id = socket.handshake.query.id
    socket.join(id)
    console.log(`${id}  connected`)
    socket.on('send-message', ({senderName,text}) => {

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
})

