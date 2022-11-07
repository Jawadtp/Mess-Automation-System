// set up db and start connection
const {Client} = require('pg')

function formatResult(db_result){
  let result = []
  for(row of db_result.rows){
    let entry = []
    for(key in row){
      entry.push(row[key])
    }
    result.push(entry)
  }
  return result
}

async function getMesses(){

    const client = new Client({
      user: 'SinadShan',
      database: 'mess'
    })

    await client.connect()
    const messes_result = await client.query('select mess_id, messname from mess where mess_id in (select mess_id from managers)')

    // Here result obtained is of the form {.."rows":[{"..":".."},{"..":".."}]..} 
    // so, convert db result to former python-backend format [..(,)..]
    let messes = formatResult(messes_result)

    await client.end()
    return messes
}

async function doesUserExist(email, password){
  const client = new Client({
    user: 'SinadShan',
    database: 'mess'
  })

  await client.connect()
  let user_result = await client.query("SELECT EXISTS(SELECT 1 FROM users WHERE email=$1 AND password=$2)", [email, password])
  
  
  let user = formatResult(user_result)

  await client.end()
  return user
}

async function getUserInfoFromEmail(email){
  const client = new Client({
    user: 'SinadShan',
    database: 'mess'
  })

  await client.connect()
  let infoResult = await client.query("SELECT roll_no, username, email, role FROM users WHERE email=$1 LIMIT 1",[email])

  let info = formatResult(infoResult)

  await client.end()
  return info[0]
}

async function getUserMessFromEmail(email, role){
  const client = new Client({
    user: 'SinadShan',
    database: 'mess'
  })

  await client.connect()
  let userMessResult
  if(role === 'student')
    userMessResult = await client.query("SELECT messname, mess_ID FROM mess WHERE mess_ID = (SELECT mess_ID FROM students WHERE roll_no = (SELECT roll_no FROM users WHERE email=$1))", [email])
  else
    userMessResult = await client.query("SELECT messname, mess_ID FROM mess WHERE mess_ID = (SELECT mess_ID FROM managers WHERE manager_ID = (SELECT roll_no FROM users WHERE email=$1))", [email])

  let userMess = formatResult(userMessResult)

  await client.end()

  // corresponding to fetchone() in psycopg2, returns single list
  return userMess[0]
}

async function getAnnouncements(messId){
  const client = new Client({
    user: 'SinadShan',
    database: 'mess'
  })

  await client.connect()
  let announcementsResult = await client.query("SELECT u.username, u.role, a.announcement, a.posted_at FROM users u, announcements a WHERE a.roll_no IN (SELECT manager_ID FROM managers WHERE mess_ID=$1) AND a.roll_no=u.roll_no ORDER BY posted_at DESC", [messId])

  let announcements = formatResult(announcementsResult)
  await client.end()
  return announcements
}

async function getMessMealDetails(messId){
  const client = new Client({
    user: 'SinadShan',
    database: 'mess'
  })

  await client.connect()
  let mealDetailsResult = await client.query("select ms.mealname, m.dayofweek, m.time from meals ms, mess_meals m where m.mealid = ms.id AND m.mess_ID=$1", [messId])

  let mealDetails = formatResult(mealDetailsResult)
  await client.end()
  return mealDetails
}

async function getMessDetails(messId){
  const client = new Client({
    user: 'SinadShan',
    database: 'mess'
  })

  await client.connect()
  let messDetailsResult = await client.query("select m.messname, u.username, u.email, m.feeslastcalculated, m.rate from mess m, users u, managers mn where mn.manager_id=u.roll_no and mn.mess_id=m.mess_id and m.mess_id=$1", [messId])

  let messDetails = formatResult(messDetailsResult)
  await client.end()
  return messDetails
}

async function getMessStudentCount(messId){
  const client = new Client({
    user: 'SinadShan',
    database: 'mess'
  })

  await client.connect()
  let studentCountResult = await client.query("select count(roll_no) from students where mess_id=$1", [messId])

  let studentCount = formatResult(studentCountResult)
  await client.end()
  return studentCount[0]
}

async function getComplaints(messId){
  const client = new Client({
    user: 'SinadShan',
    database: 'mess'
  })

  await client.connect()
  
  let complaintsResult = await client.query("SELECT complaint_id, complaint_description,roll_no,status FROM complaints WHERE mess_id = $1", [messId])

  let complaints = formatResult(complaintsResult)
  await client.end()
  return complaints
  
}

async function addComplaint(rollNo, messId, complaint){
  const client = new Client({
    user: 'SinadShan',
    database: 'mess'
  })

  await client.connect()

  try{

    await client.query("INSERT INTO complaints(complaint_description,mess_ID,roll_no) values($1,$2,$3)", [complaint, messId, rollNo])
  
    await client.end()
    return 'Success'
    
  }catch(err){
    console.log("Failed posting complaint: ", err)
    await client.end()
    return 'Failed'
  }
}

async function insertLeaveReq(rollNo, startDate, endDate, reason){
  const client = new Client({
    user: 'SinadShan',
    database: 'mess'
  })

  await client.connect()
  try{
    let managerIdResult = await client.query("SELECT manager_id FROM managers where mess_id = (SELECT mess_id FROM students WHERE roll_no = $1)", [rollNo])
    let managerId = formatResult(managerIdResult)[0][0]
  
    await client.query("INSERT INTO leave_requests (start_date,end_date,reason,roll_no,manager_id) VALUES ($1,$2,$3,$4,$5)", [startDate, endDate, reason, rollNo, managerId])
  
    await client.end()
    return 'Success'
  }catch(err){
    console.log("Failed adding leave request: ", err)
    await client.end()
    return 'Failed'
  }
}

async function updateLeaveRequests(rollNo, startDate, status){
  const client = new Client({
    user: 'SinadShan',
    database: 'mess'
  })

  await client.connect()
  try{
    await client.query("UPDATE leave_requests SET status = $1 WHERE roll_no = $2 and start_date = $3", [status, rollNo, startDate])
    await client.end()
    return 'Success'
  }catch(err) {
    console.log("Failed updating leave request: ",err)
    await client.end()
    return 'Failed'
  }
}

async function getLeaveRequests(managerId){
  const client = new Client({
    user: 'SinadShan',
    database: 'mess'
  })

  await client.connect()
  try{
    let leaveRequestsResult = await client.query("SELECT roll_no,start_date,end_date,reason,status FROM leave_requests WHERE manager_id = $1", [managerId])

    let leaveRequests = formatResult(leaveRequestsResult)
    await client.end()

    return leaveRequests
  }catch(err){
    console.log("Failed to get leave requests: ", err)
    await client.end()
    return 'Failed'
  }

}

async function getFeesLastCalculated(messId){
  const client = new Client({
    user: 'SinadShan',
    database: 'mess'
  })

  await client.connect()
  
  let dateResult = await client.query("SELECT feeslastcalculated FROM mess WHERE mess_id = $1", [messId])
  let date = formatResult(dateResult)

  await client.end()
  return date
}

async function getNumberOfLeaves(rollNo){
  const client = new Client({
    user: 'SinadShan',
    database: 'mess'
  })

  await client.connect()

  let leavesResult = await client.query("SELECT noofleaves FROM students WHERE roll_no = $1", [rollNo])
  let leaves = formatResult(leavesResult)

  await client.end()
  return leaves
}

async function getStudentInfo(managerId){
  const client = new Client({
    user: 'SinadShan',
    database: 'mess'
  })

  await client.connect()
  try{
    let messIdResult = await client.query("SELECT mess_id from managers where manager_id=$1", [managerId])

    let infoResult = await client.query("SELECT u.roll_no,username,email FROM users u,students s WHERE u.roll_no = s.roll_no AND s.mess_id = $1",[messIdResult[0]])

    let info = formatResult(infoResult)
    return info
  }catch(err){
    console.log("Failed to fetch student details:", err)
    return "Failed"
  }
}

let db = {};

// Add all functions to property of object db
db.getMesses = getMesses
db.doesUserExist = doesUserExist
db.getUserInfoFromEmail = getUserInfoFromEmail
db.getUserMessFromEmail = getUserMessFromEmail
db.getAnnouncements = getAnnouncements
db.getMessMealDetails = getMessMealDetails
db.getMessDetails =getMessDetails
db.getMessStudentCount =getMessStudentCount
db.getComplaints = getComplaints
db.addComplaint = addComplaint
db.insertLeaveReq = insertLeaveReq
db.updateLeaveRequests = updateLeaveRequests
db.getLeaveRequests = getLeaveRequests
db.getFeesLastCalculated = getFeesLastCalculated
db.getNumberOfLeaves = getNumberOfLeaves
db.getStudentInfo = getStudentInfo

module.exports = db