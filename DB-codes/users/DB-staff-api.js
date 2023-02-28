const Database = require('../database');
const database = new Database();

async function getStaffInfoById(id){
    const sql = `SELECT * FROM staff WHERE id = $1`;
    const binds = [id]
    const result = (await database.execute(sql, binds)).rows;
    return result[0];
}

module.exports = {
    getStaffInfoById
}