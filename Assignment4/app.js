const path = require('path')

const express = require('express')
const expresshbs = require('express-handlebars')

const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended : false}))

app.engine('hbs', expresshbs())
app.set('view engine', 'hbs')
app.set('views','views')

const homeRoutes = require('./routes/home')
const userRoutes = require('./routes/users')

app.use(express.static(path.join(__dirname, 'public')))

app.use(homeRoutes.routes)
app.use(userRoutes)

app.listen(3000)


/*
{defaultLayout: 'main-layout', extname: hbs} is entered inside expresshbs() when using a main-layout.hbs. check Assignment 4 solution [Section 6]
*/