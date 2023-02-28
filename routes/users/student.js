require('dotenv').config();
const router = require('express').Router();
const DB_student = require('../../DB-codes/users/DB-student-api');
const {verifyViewStudent} = require('../../middlewares/user-verification');

router.get('/info/:id', verifyViewStudent,async (req,res)=>{
    //returns the id of logged in user
    const user = await DB_student.getStudentInfoById(req.params.id);
    res.render('layout.ejs', {
        title: "User Dashboard",
        body: ['users/studentinfo.ejs'],
        user: user,
        errors: req.query.errors
    });
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


