import * as net from 'net';
import { handle } from './server';

let buffer: string = '';
let lines: string[] = [];

const server: net.Server = net.createServer((socket: net.Socket) => {
  socket.on('data', (data: Buffer) => {
    for (let index = 0; index < data.toString().length; index++) {
      const currentChar: string = data.toString()[index];
      const nextChar: string = data.toString()[index + 1];

      if (currentChar === '\r' && nextChar === '\n') {
        lines.push(buffer);
        buffer = '';
        index++;
      } else {
        buffer += currentChar;
      }

      if (lines.find((line: string) => line === '') !== undefined) {
        handle(lines, socket);
        lines = [];
      }
    }
  });
});

server.listen(8080, '127.0.0.1');
