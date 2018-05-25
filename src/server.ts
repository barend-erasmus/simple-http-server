import chalk from 'chalk';
import * as net from 'net';

export function handle(lines: string[], socket: net.Socket): void {
    // STEP: 1
    // console.log(lines);

    // STEP: 2 - Get Method and Path
    const headerLinePattern: RegExp = new RegExp(/([A-Z]{3,4}) (.*) HTTP\/1\.1/);

    const headerLinematches: RegExpMatchArray = lines[0].match(headerLinePattern);

    const method: string = headerLinematches[1];
    const path: string = headerLinematches[2];

    // console.log(`Method: ${chalk.green(method)}`);
    // console.log(`Path: ${chalk.green(path)}`);

    // STEP: 3 - Get Headers
    const headers: {} = {};
    const headersPattern: RegExp = new RegExp(/(.*): (.*)/);

    for (let index = 1; index < lines.length - 1; index ++) {
        const headersMatches: RegExpMatchArray = lines[index].match(headersPattern);

        const key: string = headersMatches[1];
        const value: string = headersMatches[2];

        headers[key] = value;
    }

    // console.log(headers);

    // STEP: 4 - Multiple Domains on 1 Port

    // Step: 5 - Url Rewrite

    // STEP: X
    const bodyOfResponse: string = 'Hello World';
    socket.write(`HTTP/1.1 200 OK\r\ncontent-length: ${bodyOfResponse.length}\r\nconnection: close\r\n\r\n${bodyOfResponse}`);
}
