// set up server
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const app = express()
const port = 3000

// parser is a json parser
const parser = bodyParser.json()

const db = require('./db')
const jsonify = JSON.stringify

app.listen(port, () => {
    console.log(`Backend node server listening on port ${port}`)
  })

app.all('/login', parser, (req, res) => {
  console.log(req.body)
  let email = req.body.email
  let password = req.body.password

  try{
    let userExists = db.doesUserExist(email, password)

    if(userExists){
      key = process.env.SECRET_KEY
      let access_token = jwt.sign(email,key)
      res.send(jsonify(access_token))
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
