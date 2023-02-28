require('dotenv').config();
const router = require('express').Router();
const DB_user = require('../../DB-codes/users/DB-user-api');
const DB_provost = require('../../DB-codes/users/DB-provost-api');
const {verifyUser} = require('../../middlewares/user-verification');

router.get('/info/:id', verifyUser,async (req,res)=>{
   const user = await DB_provost.getProvostInfoById(req.params.id);
   const user2 = await DB_user.getUserById(req.params.id); // to get the role
   res.render('layout.ejs', {
        title: "User Dashboard",
        body: ['users/provostinfo.ejs'],
         user: user,
         user2: user2,
        errors: req.query.errors
    });
});

module.exports = router;


