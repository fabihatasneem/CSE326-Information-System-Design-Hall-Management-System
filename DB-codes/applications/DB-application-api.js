const Database = require('../database');
const database = new Database();

async function submitApplication(student_id, application_pdf){
    var submission_time = new Date();
    const sql = `INSERT INTO application_for_seat (student_id, submission_time, status, application_pdf)
          VALUES ($1, $2, 'submitted', $3)`;
    const binds = [student_id, submission_time, application_pdf]
    await database.execute(sql, binds);
}

async function getAllSubmittedApplications(){
    const sql = `SELECT * FROM application_for_seat WHERE status = 'submitted'`;
    const binds = []
    const result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getApplicationInfoById(id){
    const sql = `SELECT * FROM application_for_seat a
                INNER JOIN student s ON s.id = a.student_id
                INNER JOIN student_additional_info sa ON sa.id = a.student_id
                WHERE a.id = $1`;
    const binds = [id]
    const result = (await database.execute(sql, binds)).rows;
    return result;
}

async function forwardApplication(application_id){
    const sql = `UPDATE application_for_seat SET status = 'forwardedToProvost' WHERE id = $1`;
    const binds = [application_id]
    await database.execute(sql, binds);
}

async function getAllForwardedApplications(){
    const sql = `SELECT * FROM application_for_seat WHERE status = 'forwardedToProvost'`;
    const binds = []
    const result = (await database.execute(sql, binds)).rows;
    return result;
}

async function sortApplicationsByDistrict(dhakaFlag){
    let sql;
    if(dhakaFlag == 1) {
        sql = `SELECT * FROM student s 
                INNER JOIN application_for_seat a ON s.id = a.student_id
                INNER JOIN address ad ON s.id = ad.id
                WHERE a.status = 'forwardedToProvost' AND ad.type = 'present' AND ad.district = 'Dhaka'`;
    } 
    else {
        sql = `SELECT * FROM student s 
        INNER JOIN application_for_seat a ON s.id = a.student_id
        INNER JOIN address ad ON s.id = ad.id
        WHERE a.status = 'forwardedToProvost' AND ad.type = 'present' AND ad.district NOT IN ('Dhaka')`;
    }
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
                WHERE a.status = 'forwardedToProvost' AND ad.type = 'present' AND ad.district = 'Dhaka'
                ORDER BY s.degree DESC, s.level DESC`;
    }
    else {
        sql = `SELECT * FROM student s 
        INNER JOIN application_for_seat a ON s.id = a.student_id
        INNER JOIN address ad ON s.id = ad.id
        WHERE a.status = 'forwardedToProvost' AND ad.type = 'present' AND ad.district NOT IN ('Dhaka')
        ORDER BY s.degree DESC, s.level DESC`;
    }
    const binds = []
    const result = (await database.execute(sql, binds)).rows;
    return result;
}

async function sortApplicationsBySeniorityAndDistrictAndResult(dhakaFlag){
    let sql;
    if(dhakaFlag == 1) {
        sql = `SELECT * FROM student s 
                INNER JOIN application_for_seat a ON s.id = a.student_id
                INNER JOIN address ad ON s.id = ad.id
                WHERE a.status = 'forwardedToProvost' AND ad.type = 'present' AND ad.district = 'Dhaka'
                ORDER BY s.degree DESC, s.level DESC, s.cgpa DESC`;
    } else {
        sql = `SELECT * FROM student s 
        INNER JOIN application_for_seat a ON s.id = a.student_id
        INNER JOIN address ad ON s.id = ad.id
        WHERE a.status = 'forwardedToProvost' AND ad.type = 'present' AND ad.district NOT IN ('Dhaka')
        ORDER BY s.degree DESC, s.level DESC, s.cgpa DESC`;
    }
    const binds = []
    const result = (await database.execute(sql, binds)).rows;
    return result;
}

async function rejectApplication(application_id){
    const sql = `UPDATE application_for_seat SET status = 'rejected' WHERE id = $1`;
    const binds = [application_id]
    await database.execute(sql, binds);
}

async function approveApplication(application_id){
    const sql = `UPDATE application_for_seat SET status = 'approved' WHERE id = $1`;
    const binds = [application_id]
    await database.execute(sql, binds);
}

async function callForViva(application_id){
    const sql = `UPDATE application_for_seat SET status = 'calledForViva' WHERE id = $1`;
    const binds = [application_id]
    await database.execute(sql, binds);
}

async function getCalledForVivaApplications(){
    const sql = `SELECT * FROM application_for_seat WHERE status = 'calledForViva'`;
    const binds = []
    const result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getApprovedApplications(){
    const sql = `SELECT * FROM application_for_seat WHERE status = 'approved'`;
    const binds = []
    const result = (await database.execute(sql, binds)).rows;
    return result;
}

module.exports = {
    submitApplication,
    getAllSubmittedApplications,
    getApplicationInfoById,
    forwardApplication,
    getAllForwardedApplications,
    sortApplicationsByDistrict,
    sortApplicationsBySeniorityAndDistrict,
    sortApplicationsBySeniorityAndDistrictAndResult,
    rejectApplication,
    approveApplication,
    callForViva,
    getCalledForVivaApplications,
    getApprovedApplications
}