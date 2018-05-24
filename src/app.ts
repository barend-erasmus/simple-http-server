import * as net from 'net';

let buffer: Buffer = null;

const server: net.Server = net.createServer((socket: net.Socket) => {
	socket.on('data', (data: Buffer) => {
		buffer = Buffer.concat([buffer, data]);
	});
});

server.listen(8080, '127.0.0.1');
