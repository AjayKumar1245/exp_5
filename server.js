const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Function to serve static files (HTML, CSS, JS)
function serveStaticFile(res, filePath, contentType) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

// Create the HTTP server
http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/' || req.url === '/index.html') {
            serveStaticFile(res, path.join(__dirname, 'index.html'), 'text/html');
        } else if (req.url === '/style.css') {
            serveStaticFile(res, path.join(__dirname, 'style.css'), 'text/css');
        } else if (req.url === '/script.js') {
            serveStaticFile(res, path.join(__dirname, 'script.js'), 'application/javascript');
        } else if (req.url === '/getContent') {
            // Read the content of data.txt
            fs.readFile('data.txt', 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error reading file.');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(data);
                }
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }
    } else if (req.method === 'POST' && req.url === '/saveContent') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            const newContent = JSON.parse(body).content;
            fs.writeFile('data.txt', newContent, 'utf8', (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error saving file.');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('File content updated successfully.');
                }
            });
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
}).listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
