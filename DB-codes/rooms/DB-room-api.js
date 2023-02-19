const Database = require('../database');
const database = new Database();

async function getAllRoomInfo(){
    const sql = `SELECT DISTINCT s.id AS seat_id, s.room_id, r.floor, s.student_id, st.name, st.degree,
                st.level, st.term, st.email, st.phone, st.department, st.cgpa
                FROM seat s
                LEFT JOIN room r ON s.room_id = r.id
                LEFT JOIN student st ON s.student_id = st.id
                WHERE r.purpose = 'accommodation' AND  st.residency_status = 'resident'
                ORDER BY r.floor ASC, s.room_id ASC, s.id ASC`;
    const binds = []
    const result = (await database.execute(sql, binds)).rows;
    return result;
}

module.exports = {
    getAllRoomInfo
}