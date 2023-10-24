import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const port = 2000;

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

const rooms = {
        
}

wss.on('connection', async (ws, req) => {
    console.log("connected");

    ws.on('message', (message) => {
        console.log('hi => ', message.toString());

        const messageObject = JSON.parse(message.toString());

        if (messageObject.type === 'join') {
            console.log('hi', messageObject);

        }

    })

})

server.listen(port);