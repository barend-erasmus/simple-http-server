---
theme : "league"
transition: "convex"
---

# Simple HTTP Server

From TCP Sockets to HTTP Protocol

---

# Sockets

A socket is one endpoint of a two-way communication link between two programs running on the network. A socket is bound to a port number so that the TCP layer can identify the application that data is destined to be sent to.

---

# HTTP Protocol

HTTP is the underlying protocol used by the World Wide Web and this protocol defines how messages are formatted and transmitted, and what actions Web servers and browsers should take in response to various commands.

---

# HTTP Request

```
GET /index.html HTTP/1.1
Host: example.com
Accept: */*
Accept-Language: en-us
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)
(blank line)
```

---

# HTTP Response

```
HTTP/1.1 200 OK
Content-Length: 44
Connection: close
  
<html><body><h1>It works!</h1></body></html>
```

---

# Demo

* Methods (GET, POST) and Paths
* Headers
* Multiple Domains on 1 Port
* Serving Files
* URL Rewrite

---

## Methods and Paths

```typescript
const headerLinePattern: RegExp = new RegExp(/([A-Z]{3,4}) (.*) HTTP\/1\.1/);

const headerLinematches: RegExpMatchArray = lines[0].match(headerLinePattern);

const method: string = headerLinematches[1];
const path: string = headerLinematches[2];

console.log(`Method: ${chalk.green(method)}`);
console.log(`Path: ${chalk.green(path)}`);
```

---

## Headers

```typescript
const headers: {} = {};
const headersPattern: RegExp = new RegExp(/(.*): (.*)/);

for (let index = 1; index < lines.length - 1; index ++) {
    const headersMatches: RegExpMatchArray = lines[index].match(headersPattern);

    const key: string = headersMatches[1];
    const value: string = headersMatches[2];

    headers[key] = value;
}

console.log(headers);
```
---

## Multiple Domains on 1 Port

---

## Serving Files

---

## URL Rewrite

---

# Resources

* [Webopedia](https://www.webopedia.com/TERM/H/HTTP.html)
* [NANYANG Technology University](https://www.ntu.edu.sg/home/ehchua/programming/webprogramming/HTTP_Basics.html)
