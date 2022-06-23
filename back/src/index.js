import express from 'express';
require("./database/mongoose");
import bodyParser from 'body-parser';
import UserController from './controllers/UserController';
import cors from 'cors';
import auth from './middlewares/auth';

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}))

server.post('/login', UserController.login);
server.post('/user', UserController.createUser);
server.get('/test', auth, UserController.testRoute);

server.listen(3003, () => {
    console.log("App listening on 3003");
})