import * as net from 'net';

export function handle(lines: string[], socket: net.Socket): void {
    // STEP: 1
    console.log(lines);

    // STEP: 2 - Get Method and Path
    const headerLinePattern: RegExp = new RegExp(/([A-Z]{3,4}) (.*) HTTP\/1\.1/);

    const matches: RegExpMatchArray = lines[0].match(headerLinePattern);

    const method: string = matches[1];
    const path: string = matches[2];

    // STEP: 3 - Get Headers

    // STEP: 4 - Multiple Domain on 1 Port

    // Step: 5 - Url Rewrite

    // STEP: X
    const bodyOfResponse: string = 'Hello World';
    socket.write(`HTTP/1.1 200 OK\r\ncontent-length: ${bodyOfResponse.length}\r\nconnection: close\r\n\r\n${bodyOfResponse}`);
}
