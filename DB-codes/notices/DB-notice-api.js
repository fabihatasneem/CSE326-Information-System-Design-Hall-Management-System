const Database = require('../database');
const database = new Database();

async function getAllNotices(){
    const sql = `SELECT * FROM notice WHERE status = 'approved' ORDER BY upload_time DESC`;
    const binds = []
    const result = (await database.execute(sql, binds)).rows;
    return result[0];
}

async function forwardNoticeToProvost(notice_id, staff_id, notice_title, notice_pdf){
    var upload_time = new Date();
    var status = "forwardedToProvost";
    const sql = `INSERT INTO notice (id, staff_id, upload_time, status, notice_pdf, title)
          VALUES ($1, $2, $3, $4, $5, $6)`;
    const binds = [notice_id, staff_id, upload_time, status, notice_pdf, notice_title]
    const result = (await database.execute(sql, binds)).rows;
    return result[0];
}

async function showUnapprovedNotices(){
    var status = "forwardedToProvost";
    const sql = `SELECT * FROM notice WHERE status = $1`;
    const binds = [status]
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
    showUnapprovedNotices,
    approveNotice,
    declineNotice
}