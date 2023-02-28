require('dotenv').config();
const router = require('express').Router();
const DB_user = require('../../DB-codes/users/DB-user-api');
const DB_student = require('../../DB-codes/users/DB-student-api');
const {verifyViewStudent} = require('../../middlewares/user-verification');

router.get('/info/:id', verifyViewStudent,async (req,res)=>{
    //returns the id of logged in user
    const user = await DB_student.getStudentInfoById(req.params.id);
    const user2 = await DB_user.getUserById(req.params.id); // to get the role
    console.log(user);
    res.render('layout.ejs', {
        title: "User Dashboard",
        body: ['users/studentinfo.ejs'],
        user: user,
        user2: user2,
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


