import chalk from 'chalk';
import * as fs from 'fs';
import * as net from 'net';
import * as path from 'path';

export function handle(lines: string[], socket: net.Socket): void {
    // STEP: 1
    // console.log(lines);

    // STEP: 2 - Methods and Path
    const headerLinePattern: RegExp = new RegExp(/([A-Z]{3,4}) (.*) HTTP\/1\.1/);

    const headerLinematches: RegExpMatchArray = lines[0].match(headerLinePattern);

    const method: string = headerLinematches[1];
    let urlPath: string = headerLinematches[2];

    console.log(`Method: ${chalk.green(method)}`);
    console.log(`Path: ${chalk.green(urlPath)}`);

    // STEP: 3 - Headers
    const headers: {} = {};
    const headersPattern: RegExp = new RegExp(/(.*): (.*)/);

    for (let index = 1; index < lines.length - 1; index++) {
        const headersMatches: RegExpMatchArray = lines[index].match(headersPattern);

        const key: string = headersMatches[1];
        const value: string = headersMatches[2];

        headers[key] = value;
    }

    console.log('Headers:');
    for (const key of Object.keys(headers)) {
        console.log(`    ${key}: ${chalk.green(headers[key])}`);
    }

    // STEP: 4 - Multiple Domains on 1 Port
    const domain: string = headers['Host'];

    switch (domain) {
        case 'localhost:8080':
            console.log(`Domain: ${chalk.green('localhost')}`);
            break;
        case 'my-app.local:8080':
            console.log(`Domain: ${chalk.green('my-app.local')}`);
            break;
        case 'simple-http-server.local:8080':
            console.log(`Domain: ${chalk.green('simple-http-server.local')}`);
            break;
    }

    // Step: 5 - Url Rewrite
    if (urlPath.startsWith('/home.html')) {
        urlPath = `/my-other-app/home.html`;
    }

    console.log(`Path: ${chalk.green(urlPath)}`);

    // STEP: 6 - Serving Files
    const filePath: string = path.join(__dirname, 'www', urlPath);

    if (fs.existsSync(filePath)) {
        const body: string = fs.readFileSync(filePath, 'utf8');
        sendResponse(body, 'text/html', 'OK', 200, socket);
    } else {
        sendResponse('FILE DOES NOT EXIST', 'text/html', 'Not Found', 404, socket);
    }
}

function sendResponse(
    body: string,
    contentType: string,
    reasonPhrase: string,
    statusCode: number,
    socket: net.Socket,
): void {
    socket.write(`HTTP/1.1 ${statusCode} ${reasonPhrase}\r\ncontent-length: ${body.length}\r\ncontent-type: ${contentType}\r\nconnection: close\r\n\r\n${body}`);
}
