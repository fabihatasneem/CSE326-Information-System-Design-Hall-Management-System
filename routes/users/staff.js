require('dotenv').config();
const router = require('express').Router();
const DB_staff = require('../../DB-codes/users/DB-staff-api');
const {verifyUser} = require('../../middlewares/user-verification');

router.get('/info/:id', verifyUser,async (req,res)=>{
   res.send(await DB_staff.getStaffInfoById(req.params.id));
});

module.exports = router;


