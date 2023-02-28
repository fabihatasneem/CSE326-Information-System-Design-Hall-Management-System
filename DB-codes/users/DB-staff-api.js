const Database = require('../database');
const database = new Database();

async function getStaffInfoById(id){
    const sql = `SELECT * FROM staff`;
    const binds = [id]
    const result = (await database.execute(sql, binds)).rows;
    return result[0];
}

module.exports = {
    getStaffInfoById
}