const path = require('path')

const express = require('express')

const app = express()

const homeRoutes = require('./routes/route')

app.use(express.static(path.join(__dirname, 'public')))

app.use(homeRoutes)

app.listen(3000)