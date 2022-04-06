const express = require('express')
const mysql = require('mysql')
const syspath = require('path')
var bodyParser = require("body-parser")

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
app.use(bodyParser.urlencoded({ extended: false }))

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

app.post('/addesercizio', (req, res) => {
    console.log(req.body)
    con.query('insert into esercizio(nome, descrizione)' +
                'values(\'' + req.body.nome + '\',\'' + req.body.descrizione + '\')')
    res.redirect(301, '/')
})

app.get('/serie', (req, res) => {
    con.query('select * from serie where esercizio = ' + req.query.id, (err, result) => {
        if (err) return err
        res.send(result)
    })
})
app.post('/addserie', (req, res) => {
    con.query('insert into serie(esercizio, peso, numero)' + 
                'values(' + req.body.esercizio + ',' + req.body.peso + ',"' + req.body.numero + '")')
    res.redirect(301, '/')
})

app.post('/addfail', (req, res) => {
    con.query('update serie set cedimento = ' + req.body.fail +
                ' where id = ' + req.body.id)
    res.redirect(301, '/')
})

app.listen(3000)