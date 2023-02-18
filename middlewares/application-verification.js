require('dotenv').config();
const jwt = require('jsonwebtoken');
const DB_user = require('../DB-codes/users/DB-user-api');

async function verifyStudent(req,res,next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.redirect('/api/auth/login?status=Access Denied');
    const token = cookie.slice(11);
    try{
        const verified = jwt.verify(token, process.env.JWT_TOKEN_HELPER);
        req.user =await DB_user.getUserById(verified.user_id);
        if(req.user.role != 'student' ) return res.redirect('/api/auth/login?status=Access Denied');
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}

async function verifyProvost(req,res,next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.redirect('/api/auth/login?status=Access Denied');
    const token = cookie.slice(11);
    try{
        const verified = jwt.verify(token, process.env.JWT_TOKEN_HELPER);
        req.user =await DB_user.getUserById(verified.user_id);
        if(req.user.role != 'provost' ) return res.redirect('/api/auth/login?status=Access Denied');
        next();

    }catch(err){
        res.status(400).send('Invalid Token');
    }
}

async function verifyStaff(req,res,next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.redirect('/api/auth/login?status=Access Denied');
    const token = cookie.slice(11);
    try{
        const verified = jwt.verify(token, process.env.JWT_TOKEN_HELPER);
        req.user =await DB_user.getUserById(verified.user_id);
        if(req.user.role != 'staff' ) return res.redirect('/api/auth/login?status=Access Denied');
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}

async function verifyAuthority(req,res,next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.redirect('/api/auth/login?status=Access Denied');
    const token = cookie.slice(11);
    try{
        const verified = jwt.verify(token, process.env.JWT_TOKEN_HELPER);
        req.user =await DB_user.getUserById(verified.user_id);
        if(req.user.role != 'staff' || req.user.role != 'provost' ) return res.redirect('/api/auth/login?status=Access Denied');
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}


module.exports = {
    verifyStudent,
    verifyProvost,
    verifyStaff,
    verifyAuthority
}