require('dotenv').config();
const router = require('express').Router();
const DB_user = require('../../DB-codes/users/DB-user-api');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const {verify} = require('../../middlewares/user-verification');

router.get('/login', async(req, res) => {
    let errors = [];
    if (req.query.register)
        errors.push(req.query.register);

    res.render('body/auth/login.ejs', {
            title : 'Hall Management Sytem Login',
            user: null,
            errors: errors
        })
});

router.post('/login', async (req, res) => {
    
    let result = [], errors = [];
    result = await DB_user.getUserById(req.body.id);
    // if no result, there is no such user
    if (result === undefined) {
        errors.push('Wrong User Id');
    } else {
        // match passwords
        const validPass = await bcrypt.compare(req.body.password, result.password);
        if (validPass) {
            // if successful login the user
            const token = jwt.sign({ user_id: result.id }, process.env.JWT_TOKEN_HELPER);
            let options = {
                maxAge: 90000000, 
                httpOnly: true
            }
            res.cookie('auth-token', token, options);
        }
        else {
            errors.push('Wrong Password');
        }
    }
    if(errors.length == 0){
        res.send("logged in");
        //res.redirect('/api/user');
    } else {
        res.send("Error");
        // res.render('body/auth/login.ejs', {
        //     title : 'Hall Management Sytem Login',
        //     user: null,
        //     errors : errors,
        //     form: {
        //         id: req.body.id,
        //         password: req.body.password
        //     }
        // });
    }
    
});

router.post('/logout', verify ,(req,res)=>{
    //destroy token
    res.cookie('auth-token', '', { maxAge:1 });
    res.send("logged out");
    //res.redirect('/api/auth/login');
});

router.get('/info', verify, (req,res)=>{
    //returns the id of logged in user
    res.send({user_id : req.user.USER_ID});
});

const DB_notice = require('../../DB-codes/notices/DB-notice-api');
const { verifyViewNotice } = require('../../middlewares/notice-verification');
const { verifyUploadNotice } = require('../../middlewares/notice-verification');
const { verifyApproveNotice } = require('../../middlewares/notice-verification');

router.post('/upload',verifyUploadNotice, async (req,res)=>{   
    await DB_notice.forwardNoticeToProvost(req.user.id,req.body.notice_title, req.body.notice_pdf);
    res.send('redirect korte hobe');
});

router.get('/view',verifyViewNotice, async (req,res)=>{  
    res.send(await DB_notice.getAllNotices());
});

router.get('/forwarded',verifyApproveNotice, async (req,res)=>{   
    res.send(await DB_notice.showForwardedNotices());
});

router.post('/approve',verifyApproveNotice, async (req,res)=>{   
    await DB_notice.forwardNoticeToProvost(req.body.notice_id);
    res.send('redirect korte hobe');
});

router.post('/decline',verifyApproveNotice, async (req,res)=>{   
    await DB_notice.forwardNoticeToProvost(req.body.notice_id);
    res.send('redirect korte hobe');
});

module.exports = router;