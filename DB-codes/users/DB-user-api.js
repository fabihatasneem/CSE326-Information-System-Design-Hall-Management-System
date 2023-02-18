const Database = require('../database');
const database = new Database();

async function getUserById(user_id){
    const sql = `SELECT * FROM credentials
                WHERE id = $1`;
    const binds = [user_id]
    const result = (await database.execute(sql, binds)).rows;
    return result[0];
}

module.exports = {
    getUserById
}