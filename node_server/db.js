// set up db and start connection
const {Client} = require('pg')

function format_result(db_result){
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
    let messes = format_result(messes_result)

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
  
  
  let user = format_result(user_result)

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

  let info = format_result(infoResult)

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

  let userMess = format_result(userMessResult)

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

  let announcements = format_result(announcementsResult)
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

  let mealDetails = format_result(mealDetailsResult)
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

  let messDetails = format_result(messDetailsResult)
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

  let studentCount = format_result(studentCountResult)
  await client.end()
  return studentCount[0]
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

module.exports = db