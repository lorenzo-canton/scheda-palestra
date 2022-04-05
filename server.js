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

app.get('/esercizi', (req, res) => {
    con.query('select * from esercizio', (err, result) => {
        if (err) throw err
        res.send(result)
    })
})
app.get('/serie', (req, res) => {
    con.query('select * from serie where esercizio = ' + req.query.id, (err, result) => {
        if (err) return err
        res.send(result)
    })
})

app.listen(3000)