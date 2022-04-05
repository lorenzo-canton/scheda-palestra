const express = require('express')
const mysql = require('mysql')
const syspath = require('path')

var con = mysql.createConnection({
    host: "localhost",
    user: "scheda",
    password: "palestra",
    database: "scheda"
})
con.connect(function(err) {
    if (err) throw err
    console.log("Connected!")
})

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(syspath.join(__dirname, 'html/index.html'))
})

app.get('/script', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript')
    res.sendFile(syspath.join(__dirname, 'html/script.js'))
})

app.get('/data', (req, res) => {
    con.query('select * from esercizio', (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

app.listen(3000)