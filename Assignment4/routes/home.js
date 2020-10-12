const path = require('path')

const express = require('express')

const router = express.Router()

const userList = [];

router.get('/', (req, res, next) => {
    res.render('home', {pageTitle : 'Home'})
})

router.post('/add-user', (req, res, next) => {
    userList.push({user : req.body.user})
    console.log(req.body) //for checking of input
    res.redirect('/users')
})

exports.routes = router
exports.userList = userList