const Database = require('../database');
const database = new Database();

async function getStudentInfoById(id){
    const sql = `SELECT * FROM student
                INNER JOIN address ON student.id = address.id
                WHERE student.id = $1 AND address.type = 'present'`;  //sending present address too for provost consideration in viva
    const binds = [id]
    const result = (await database.execute(sql, binds)).rows;
    return result[0];
}

async function getAddressById(id){
    const sql = `SELECT * FROM address
                WHERE id = $1`;
    const binds = [id]
    const result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getStudentAdditionalInfoById(id){
    const sql = `SELECT * FROM student_additional_info
                WHERE id = $1`;
    const binds = [id]
    const result = (await database.execute(sql, binds)).rows;
    return result[0];
}

async function updateAdditionalInfoById(father_image, father_phone, father_occupational_certificate,
        mother_image, mother_phone, mother_occupational_certificate, guardian_name, guardian_image, guardian_phone, 
        student_id_card, transcript, birth_certificate, utility_bill, siblings_document, yearly_family_income,
        parent_transfer_order, id){
    const sql = `UPDATE student_additional_info
                SET father_image = COALESCE($1,father_image),
                father_phone = COALESCE($2, father_phone),
                father_occupational_certificate = COALESCE($3, father_occupational_certificate),
                mother_image = COALESCE($4, mother_image),
                mother_phone = COALESCE($5, mother_phone),
                mother_occupational_certificate = COALESCE($6, mother_occupational_certificate),
                guardian_name = COALESCE($7, guardian_name),
                guardian_image = COALESCE($8, guardian_image),
                guardian_phone = COALESCE($9, guardian_phone),
                student_id_card = COALESCE($10, student_id_card),
                transcript = COALESCE($11, transcript),
                birth_certificate = COALESCE($12, birth_certificate),
                utility_bill = COALESCE($13, utility_bill),
                siblings_document = COALESCE($14, siblings_document),
                yearly_family_income = COALESCE($15, yearly_family_income),
                parent_transfer_order = COALESCE($16, parent_transfer_order)
                WHERE id = $17`;
    const binds = [father_image, father_phone, father_occupational_certificate,
        mother_image, mother_phone, mother_occupational_certificate, guardian_name, guardian_image, guardian_phone, 
        student_id_card, transcript, birth_certificate, utility_bill, siblings_document, yearly_family_income,
        parent_transfer_order, id]
    await database.execute(sql, binds);
}

async function updateResidencyStatusToResident(student_id){
    const sql = `UPDATE student SET residency_status = 'resident'
                WHERE id = $1`;
    const binds = [student_id]
    await database.execute(sql, binds);
}

async function updateResidencyStatusToAttached(student_id){
    const sql = `UPDATE student SET residency_status = 'attached'
                WHERE id = $1`;
    const binds = [student_id]
    await database.execute(sql, binds);
}

module.exports = {
    getStudentInfoById,
    getAddressById,
    getStudentAdditionalInfoById,
    updateAdditionalInfoById,
    updateResidencyStatusToResident,
    updateResidencyStatusToAttached
}