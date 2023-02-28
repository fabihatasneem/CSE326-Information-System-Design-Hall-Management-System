require('dotenv').config();
const router = require('express').Router();
const DB_provost = require('../../DB-codes/users/DB-provost-api');
const {verifyUser} = require('../../middlewares/user-verification');

router.get('/info/:id', verifyUser,async (req,res)=>{
   res.send(await DB_provost.getProvostInfoById(req.params.id));
});

module.exports = router;


