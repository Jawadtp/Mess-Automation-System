// set up server
const express = require('express')
const db = require('./db')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const { json } = require('body-parser')

const app = express()
const port = 5000

app.use(cors({
  origin: 'http://localhost:3000',
}))

// parser is a json parser
const parser = bodyParser.json()

const jsonify = JSON.stringify

app.listen(port, () => {
    console.log(`Backend node server listening on port ${port}`)
  })


app.get('/validate', async (req, res) => {
  let token = req.headers.authorization.split(' ')[1]
  let key = process.env.SECRET_KEY

  // verify token
  jwt.verify(token,key, (err) => {
    if (err) res.sendStatus(403)
  })
  
  // decode and get email
  let email = jwt.decode(token)
  if (email){
    let userInfo = await db.getUserInfoFromEmail(email)

      let userMess = await db.getUserMessFromEmail(email,userInfo[3])
      // If user is not registered to any mess
      if (!userMess) userMess = ['', 999]
    
      userInfo = { 'rollno': userInfo[0], 'name': userInfo[1], 'email': userInfo[2], 'role': userInfo[3], 'messname': userMess[0], 'messid': userMess[1] }
      
      res.send(jsonify(userInfo))
  }

  // need to send response when token not present
  // res.send() throws error 'Cannot set headers after they are sent to client'
  
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

app.post('/announcements', parser, async (req, res) => {
  let messId = req.body.messid
  try{
    let announcements = await db.getAnnouncements(messId)
    res.send(jsonify(announcements))
  }catch(err){
    res.send(jsonify({"error": err}))
  }
})

app.all('/messdetails', parser, async (req, res) => {
  let messId = req.body.messid

  try{
    let meals = await db.getMessMealDetails(messId)
    let messDetails = await db.getMessDetails(messId)
    let studentCount = await db.getMessStudentCount(messId)

    res.send(jsonify({'meals': meals, 'count': studentCount,'details': messDetails}))
  }catch(err) {
    console.log(err)
    res.send(jsonify({'message': 'error'}))
  }
})

app.post('/get-complaints', parser, async (req, res) => {
  let messId = req.body.messID

  let complaints = await db.getComplaints(messId)
  res.send(jsonify(complaints))

})

app.post('/post-complaint', parser, async (req, res) => {

  let rollNo = req.body.rollNo
  let messID = req.body.messID
  let complaint = req.body.complaint

  let message = db.addComplaint(rollNo, messID, complaint)
  res.send(jsonify(message))

})

app.post('/get-leave-requests', parser, async (req, res) => {
  let managerId = req.body.managerID
  let requests = await db.getLeaveRequests(managerId)

  res.send(jsonify(requests))
})

app.post('/submit-leave-request', parser, async (req, res) => {

  let rollNo = req.body.rollNo
  let startDate = req.body.request.startDate
  let endDate = req.body.request.endDate
  let reason = req.body.request.reason

  let message = await db.insertLeaveReq(rollNo, startDate, endDate, reason)
  res.send(jsonify(message))

})

app.post('/update-leave-requests', parser, async (req, res) => {
  
  let rollNo = req.body.rollNo
  let startDate = req.body.startDate
  let status = req.body.status
  let message = db.updateLeaveRequests(rollNo, startDate, status)

  res.send(message)

})