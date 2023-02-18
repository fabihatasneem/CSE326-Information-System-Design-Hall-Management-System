require('dotenv').config();
const router = require('express').Router();
const DB_student = require('../../DB-codes/users/DB-student-api');
const {verifyViewStudent} = require('../../middlewares/user-verification');

router.get('/info/:id', verifyViewStudent,async (req,res)=>{
    //returns the id of logged in user
    res.send(await DB_student.getStudentInfoById(req.params.id));
});

router.get('/address/:id', verifyViewStudent,async (req,res)=>{
    //returns the id of logged in user
    res.send(await DB_student.getAddressById(req.params.id));
});

router.get('/additional_info/:id', verifyViewStudent,async (req,res)=>{
    //returns the id of logged in user
    res.send(await DB_student.getStudentAdditionalInfoById(req.params.id));
});

module.exports = router;


