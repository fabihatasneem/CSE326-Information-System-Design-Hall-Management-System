const Database = require('../database');
const database = new Database();

async function getAllNotices(){
    const sql = `SELECT notice.id, notice.title, notice.notice_pdf, notice.upload_time, notice.staff_id, staff.name
                FROM notice
                INNER JOIN staff ON notice.staff_id = staff.id
                WHERE notice.status = 'approved'
                ORDER BY notice.upload_time DESC`;
    const binds = []
    const result = (await database.execute(sql, binds)).rows;
    return result;
}

async function forwardNoticeToProvost(staff_id, notice_title, notice_pdf){
    var upload_time = new Date();
    console.log(upload_time);
    var status = "forwardedToProvost";
    const sql = `INSERT INTO notice (staff_id, upload_time, status, notice_pdf, title)
          VALUES ($1, $2, $3, $4, $5)`;
    const binds = [staff_id, upload_time, status, notice_pdf, notice_title]
    await database.execute(sql, binds);
}

async function getForwardedNotices(){
    const sql = `SELECT notice.id, notice.title, notice.notice_pdf, notice.upload_time, notice.staff_id, staff.name
                FROM notice
                INNER JOIN staff ON notice.staff_id = staff.id
                WHERE notice.status = 'forwardedToProvost'
                ORDER BY notice.upload_time DESC`;
    const binds = []
    const result = (await database.execute(sql, binds)).rows;
    return result;
}

async function approveNotice(notice_id){
    const sql = `UPDATE notice SET status = 'approved' WHERE id = $2 RETURNING *`;
    const binds = [notice_id]
    const result = (await database.execute(sql, binds)).rows;
    return result[0];
}

async function declineNotice(notice_id){
    const sql = `UPDATE notice SET status = 'declined' WHERE id = $2 RETURNING *`;
    const binds = [notice_id]
    const result = (await database.execute(sql, binds)).rows;
    return result[0];
}

module.exports = {
    getAllNotices,
    forwardNoticeToProvost,
    getForwardedNotices,
    approveNotice,
    declineNotice
}