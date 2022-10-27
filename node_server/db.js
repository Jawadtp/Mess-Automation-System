// set up db and start connection
const {Client} = require('pg')
const client = new Client()

let db = {};

async function getMesses(){
    await client.connect()
    const res = await client.query('select mess_id, messname from mess where mess_id in (select mess_id from managers)')
    await client.end()
}

db.getMesses = getMesses

module.exports = db