const Database = require('../database');
const database = new Database();

async function getAllStudents(){
    const sql = `SELECT * FROM student`;
    const binds = []
    const result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getStudentsByDepartment(department){
    const sql = `SELECT * FROM student
                WHERE department = $1`;
    const binds = [department]
    const result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getStudentsByBatch(level, term){
    const sql = `SELECT * FROM student
                WHERE degree = 'B.Sc' AND level = $2 AND term = $3`;
    const binds = [level, term]
    const result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getStudentsByDegree(degree){
    const sql = `SELECT * FROM student
                WHERE degree = $1`;
    const binds = [degree]
    const result = (await database.execute(sql, binds)).rows;
    return result;
}

module.exports = {
    getAllStudents,
    getStudentsByDepartment,
    getStudentsByBatch,
    getStudentsByDegree
}