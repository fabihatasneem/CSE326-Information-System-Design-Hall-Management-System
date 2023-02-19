const Database = require('../database');
const database = new Database();


async function saveAllocationHistory(seat_id, room_id, student_id){
    var allocation_date = new Date();
    const sql = `INSERT INTO seat_allocation_history(room_id, seat_id, student_id, allocation_date)
          VALUES ($1, $2, $3, $4)`;
    const binds = [room_id, seat_id, student_id, allocation_date]
    await database.execute(sql, binds);
}


async function updateDeallocationHistory(seat_id, room_id){
    var deallocation_date = new Date();
    const sql = `UPDATE seat_allocation_history SET deallocation_date = $1
                WHERE room_id = $2 AND seat_id = $3`;
    const binds = [deallocation_date, room_id, seat_id]
    await database.execute(sql, binds);
}

module.exports = {
    saveAllocationHistory,
    updateDeallocationHistory
}