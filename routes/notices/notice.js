require('dotenv').config();
const router = require('express').Router();
const DB_notice = require('../../DB-codes/notices/DB-notice-api');
const { verifyStudent } = require('../../middlewares/application-verification');
const { verifyViewNotice, verifyUploadNotice, verifyApproveNotice } = require('../../middlewares/notice-verification');

router.post('/submit',verifyStudent, async (req,res)=>{   
    await DB_notice.forwardNoticeToProvost(req.user.id,req.body.notice_title, req.body.notice_pdf);
    res.send('redirect korte hobe');
});

router.get('/view',verifyViewNotice, async (req,res)=>{  
    res.send(await DB_notice.getAllNotices());
});

router.get('/forwarded',verifyApproveNotice, async (req,res)=>{   
    res.send(await DB_notice.getForwardedNotices());
});

router.post('/approve',verifyApproveNotice, async (req,res)=>{   
    await DB_notice.approveNotice(req.body.notice_id);
    res.send('redirect korte hobe');
});

router.post('/decline',verifyApproveNotice, async (req,res)=>{   
    await DB_notice.declineNotice(req.body.notice_id);
    res.send('redirect korte hobe');
});

module.exports = router;