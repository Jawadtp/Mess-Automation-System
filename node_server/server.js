// set up server
const express = require('express')
const app = express()
const port = 3000

const db = require('./db')
const jsonify = JSON.stringify

app.listen(port, () => {
    console.log(`Backend node server listening on port ${port}`)
  })

app.get('/messes', (req, res) => {
    let messes = db.getMesses()
    res.send(jsonify(messes))
  })
