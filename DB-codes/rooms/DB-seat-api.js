const Database = require('../database');
const database = new Database();

async function getAllUnallocatedSeats(){
    const sql = `SELECT DISTINCT r.floor, s.room_id, s.id AS seat_id
                FROM seat s
                LEFT JOIN room r ON s.room_id = r.id
                WHERE r.purpose = 'accommodation' AND s.student_id IS NULL
                ORDER BY r.floor ASC, s.room_id ASC, s.id ASC`;
    const binds = []
    const result = (await database.execute(sql, binds)).rows;
    return result;
}

async function allocateSeat(seat_id, room_id, student_id){
    const sql = `UPDATE seat SET student_id = $1
                WHERE room_id = $3 AND id = $2`;
    const binds = [student_id, seat_id, room_id]
    await database.execute(sql, binds);
}

async function deallocateSeat(seat_id, room_id, student_id){
    const sql = `UPDATE seat SET student_id = null
                WHERE room_id = $3 AND id = $2`;
    const binds = [student_id, seat_id, room_id]
    await database.execute(sql, binds);
}

module.exports = {
    getAllUnallocatedSeats,
    allocateSeat,
    deallocateSeat
}