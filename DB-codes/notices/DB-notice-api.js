const Database = require('../database');
const database = new Database();

async function getAllNotices(){
    const sql = `SELECT notice.title, notice.notice_pdf, notice.upload_time, notice.staff_id, staff.name
                FROM notice
                INNER JOIN staff ON notice.staff_id = staff.id
                WHERE notice.status = 'approved'
                ORDER BY notice.upload_time DESC`;
    const binds = []
    const result = (await database.execute(sql, binds)).rows;
    return result[0];
}

async function forwardNoticeToProvost(staff_id, notice_title, notice_pdf){
    var upload_time = new Date();
    console.log(upload_time);
    var status = "forwardedToProvost";
    const sql = `INSERT INTO notice (staff_id, upload_time, status, notice_pdf, title)
          VALUES ($1, $2, $3, $4, $5)`;
    const binds = [staff_id, upload_time, status, notice_pdf, notice_title]
    const result = (await database.execute(sql, binds)).rows;
    return result[0];
}

async function showForwardedNotices(){
    const sql = `SELECT notice.title, notice.notice_pdf, notice.upload_time, notice.staff_id, staff.name
                FROM notice
                INNER JOIN staff ON notice.staff_id = staff.id
                WHERE notice.status = 'forwardedToProvost'
                ORDER BY notice.upload_time DESC`;
    const binds = []
    const result = (await database.execute(sql, binds)).rows;
    return result[0];
}

async function approveNotice(notice_id){
    var status = "approved";
    const sql = `UPDATE notice SET status = $1 WHERE id = $2`;
    const binds = [status, notice_id]
    const result = (await database.execute(sql, binds)).rows;
    return result[0];
}

async function declineNotice(notice_id){
    var status = "declined";
    const sql = `UPDATE notice SET status = $1 WHERE id = $2`;
    const binds = [status, notice_id]
    const result = (await database.execute(sql, binds)).rows;
    return result[0];
}

module.exports = {
    getAllNotices,
    forwardNoticeToProvost,
    showForwardedNotices,
    approveNotice,
    declineNotice
}