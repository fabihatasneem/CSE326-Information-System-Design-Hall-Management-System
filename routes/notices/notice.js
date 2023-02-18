require('dotenv').config();
const router = require('express').Router();
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