"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handle(lines, socket) {
    console.log(lines);
    const headerLinePattern = new RegExp(/([A-Z]{3,4}) (.*) HTTP\/1\.1/);
    const matches = lines[0].match(headerLinePattern);
    console.log(matches);
    const bodyOfResponse = 'Hello World';
    socket.write(`HTTP/1.1 200 OK\r\ncontent-length: ${bodyOfResponse.length}\r\nconnection: close\r\n\r\n${bodyOfResponse}`);
}
exports.handle = handle;
//# sourceMappingURL=server.js.map