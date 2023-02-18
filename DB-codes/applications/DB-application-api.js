const Database = require('../database');
const database = new Database();

async function getAllForwardedApplications(){
    const sql = `SELECT * FROM application_for_seat WHERE status = 'forwaredToProvost'`;
    const binds = []
    const result = (await database.execute(sql, binds)).rows;
    return result;
}

async function sortApplicationsBySeniority(){
    const sql = `SELECT * FROM student s INNER JOIN application_for_seat a ON s.id = a.student_id
                WHERE a.status = 'forwaredToProvost' ORDER BY s.degree DESC, s.level DESC`;
    const binds = []
    const result = (await database.execute(sql, binds)).rows;
    return result;
}

async function sortApplicationsBySeniorityAndDistrict(dhakaFlag){
    let sql;
    if(dhakaFlag == 1) {
        sql = `SELECT * FROM student s 
                INNER JOIN application_for_seat a ON s.id = a.student_id
                INNER JOIN address ad ON s.id = ad.id
                WHERE a.status = 'forwaredToProvost' AND ad.district = $1
                ORDER BY s.degree DESC, s.level DESC`;
    }
    else {
        sql = `SELECT * FROM student s 
        INNER JOIN application_for_seat a ON s.id = a.student_id
        INNER JOIN address ad ON s.id = ad.id
        WHERE a.status = 'forwaredToProvost' AND ad.district NOT IN ('Dhaka')
        ORDER BY s.degree DESC, s.level DESC`;
    }
    const binds = [district]
    const result = (await database.execute(sql, binds)).rows;
    return result;
}

async function sortApplicationsBySeniorityAndDistrictAndResult(dhakaFlag){
    let sql;
    if(dhakaFlag == 1) {
        sql = `SELECT * FROM student s 
                INNER JOIN application_for_seat a ON s.id = a.student_id
                INNER JOIN address ad ON s.id = ad.id
                WHERE a.status = 'forwaredToProvost' AND ad.district = $1
                ORDER BY s.degree DESC, s.level DESC, s.cgpa DESC`;
    } else {
        sql = `SELECT * FROM student s 
        INNER JOIN application_for_seat a ON s.id = a.student_id
        INNER JOIN address ad ON s.id = ad.id
        WHERE a.status = 'forwaredToProvost' AND ad.district NOT IN ('Dhaka')
        ORDER BY s.degree DESC, s.level DESC, s.cgpa DESC`;
    }
    const binds = [district]
    const result = (await database.execute(sql, binds)).rows;
    return result;
}

async function rejectApplication(id){
    const sql = `UPDATE application_for_seat SET status = 'rejected' WHERE id = $1`;
    const binds = [id]
    await database.execute(sql, binds);
}

module.exports = {
    getAllForwardedApplications,
    sortApplicationsBySeniority,
    sortApplicationsBySeniorityAndDistrict,
    sortApplicationsBySeniorityAndDistrictAndResult,
    rejectApplication
}