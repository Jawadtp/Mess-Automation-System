// set up db and start connection
const {Client} = require('pg')

let db = {};

async function getMesses(){

    const client = new Client({
        user: 'SinadShan',
        database: 'mess'
    })

    await client.connect()
    const messes = await client.query('select mess_id, messname from mess where mess_id in (select mess_id from managers)')

    // convert db result to former python-backend format
    // here result obtained is of the form {.."rows":[{"..":".."},{"..":".."}]..} 
    let result = []
    for(row of messes.rows){
      let entry = []
      for(key in row){
        entry.push(row[key])
      }
      result.push(entry)
    }

    await client.end()
    return result
}

db.getMesses = getMesses

module.exports = db