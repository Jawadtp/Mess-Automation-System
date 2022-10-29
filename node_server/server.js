// set up server
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()
const port = 5000

app.use(cors({
  origin: 'http://localhost:3000',
}))

// parser is a json parser
const parser = bodyParser.json()

const db = require('./db')
const jsonify = JSON.stringify

app.listen(port, () => {
    console.log(`Backend node server listening on port ${port}`)
  })

app.all('/login', parser, (req, res) => {
  let email = req.body.email
  let password = req.body.password

  try{
    let userExists = db.doesUserExist(email, password)

    if(userExists){
      let key = process.env.SECRET_KEY
      let access_token = jwt.sign(email,key)
      res.send(jsonify({ access_token: access_token} ))
    }
  }catch(err){
    console.log(err)
    res.send(jsonify({"error": "Invalid credentials"}))
  }

})

app.get('/messes', async (req, res) => {
    let messes = await db.getMesses()
    // send jsonified response
    res.send(jsonify(messes))
  })
