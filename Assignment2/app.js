const express = require('express')

const app = express()

app.use('/users', (req, res, next) => {
    console.log('2nd middleware')
    res.send("<h1>User page</h1>")
})

app.use('/', (req, res, next) => {
    console.log('1st middleware')
    res.send("<h1>Hello from NodeJS</h1>")
})

app.listen(3000)