"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net = require("net");
const server_1 = require("./server");
let buffer = '';
let lines = [];
const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        for (let index = 0; index < data.toString().length; index++) {
            const currentChar = data.toString()[index];
            const nextChar = data.toString()[index + 1];
            if (currentChar === '\r' && nextChar === '\n') {
                lines.push(buffer);
                buffer = '';
                index++;
            }
            else {
                buffer += currentChar;
            }
            if (lines.find((line) => line === '') !== undefined) {
                server_1.handle(lines, socket);
                lines = [];
            }
        }
    });
});
server.listen(8080, '127.0.0.1');
//# sourceMappingURL=app.js.map