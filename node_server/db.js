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
    const messes = await client.query('select mess_id, messname from mess where mess_id in (select mess_id from managers)')

    // Here result obtained is of the form {.."rows":[{"..":".."},{"..":".."}]..} 
    // so, convert db result to former python-backend format [..(,)..]
    let result = format_result(messes)

    await client.end()
    return result
}

let db = {};

// Add all functions to property of object db
db.getMesses = getMesses

module.exports = db