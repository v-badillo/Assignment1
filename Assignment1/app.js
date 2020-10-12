const http = require('http')

const usersList = ['User1', 'User2', 'User3', 'User4', 'User5']

const server = http.createServer((req, res) => {
    const url = req.url
    const method = req.method
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html><head><title>Section 3 assignment</title></head>')
        res.write('<body><h1>Hello from NodeJS!</h1><form action="/create-user" method="POST"><input type="text" name="create-user"></input><button type="submit">Submit</button></form></body> </html>')
        return res.end()
    }
    if (url === '/users'){
        res.setHeader('Content-Type', 'text/html')
        res.write('<html><head><title>Section 3 assignment</title></head> <body><ul>')
        for (let user of usersList) {
            res.write('<li>' + user + '</li>')
        }
        res.write('</ul></body> </html>')
        return res.end()
    }
    if (url === '/create-user' && method === 'POST'){

        const body = []
        req.on('data', (chunk) =>{
            body.push(chunk)
        })
        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString()
            //console.log(parseBody);
            console.log(parseBody.split('=')[1]);
        })
        res.statusCode = 302
        res.setHeader('Location', '/users')
        res.end()
    }
})

server.listen(3000)