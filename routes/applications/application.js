require('dotenv').config();
const router = require('express').Router();
const DB_user = require('../../DB-codes/users/DB-user-api');
const DB_student = require('../../DB-codes/users/DB-student-api');
const DB_application = require('../../DB-codes/applications/DB-application-api');
const { verifyStudent, verifyProvost, verifyStaff, verifyAuthority } = require('../../middlewares/application-verification');

router.get('', verifyStudent, async (req, res) => {
    let errors = [];
    if (req.query.msg)
        errors.push(req.query.msg);
    else 
        errors.push('Please fill up the application form carefully. Once submitted, it cannot be edited.');
    user = await DB_user.getUserById(req.user.id);
    res.render('layout.ejs', {
        title: "Room Allocation Application",
        body: ['application/application.ejs'],
        user: user,
        user2: user,
        errors: errors
    });
})

router.post('/submit', verifyStudent, async (req, res) => {   
    await DB_application.submitApplication(req.user.id,req.body.application_pdf);
    await DB_student.updateAdditionalInfoById(req.body.father_image, req.body.father_phone, req.body.father_occupational_certificate,
        req.body.mother_image, req.body.mother_phone, req.body.mother_occupational_certificate, req.body.guardian_name, req.body.guardian_image, req.body.guardian_phone, req.body.
        student_id_card, req.body.transcript, req.body.birth_certificate, req.body.utility_bill, req.body.siblings_document, req.body.yearly_family_income,
        req.body.parent_transfer_order, req.user.id);
    res.redirect('/api/application?msg=Application successfully submitted');
    //res.send('Application successfully submitted');
});

router.get('/all_submitted',verifyStaff, async (req,res)=>{  
    const applications = await DB_application.getAllSubmittedApplications();
    const user = await DB_user.getUserById(req.user.id);
    res.render('layout.ejs', {
            title : "All Submitted Applications",
            body: ['application/submitted'],
            user2 : user,
            applications : applications,
            cur_user_id : req.user.id
        });
});

router.post('/forward/:id', verifyStaff, async (req, res) => {
    await DB_application.forwardApplication(req.params.id);
    res.redirect('/api/application/all_submitted');
});

// all_forwarded?filter=...&dhakaFlag=yes
router.get('/all_forwarded',verifyProvost, async (req,res)=>{
    let dhakaFlag = 0;
    if(req.query.dhakaFlag === 'yes') dhakaFlag = 1;
    if(req.query.filter === 'dist'){
        res.send(await DB_application.sortApplicationsByDistrict(dhakaFlag));
    } 
    if(req.query.filter === 'dist_batch'){
        res.send(await DB_application.sortApplicationsBySeniorityAndDistrict(dhakaFlag));
    }
    if(req.query.filter === 'dist_batch_result'){
        res.send(await DB_application.sortApplicationsBySeniorityAndDistrictAndResult(dhakaFlag));
    }
    res.send(await DB_application.getAllForwardedApplications());
});

router.post('/approve',verifyProvost, async (req,res)=>{   
    await DB_application.approveApplication(req.body.application_id);
    res.send('redirect korte hobe');
});

router.post('/reject/:id', verifyAuthority, async (req, res) => {
    await DB_application.rejectApplication(req.params.id);
    res.send('application rejected');
});

router.post('/call_for_viva',verifyProvost, async (req,res)=>{   
    await DB_application.callForViva(req.body.application_id);
    res.send('redirect korte hobe');
});

router.get('/all_call_for_viva',verifyAuthority, async (req,res)=>{  
    res.send(await DB_application.getCalledForVivaApplications());
});

router.get('/all_approved',verifyAuthority, async (req,res)=>{  
    res.send(await DB_application.getApprovedApplications());
});

router.get('/student/:id',verifyAuthority, async (req,res)=>{  
    res.send(await DB_application.getApplicationInfoById(req.params.id));
});

module.exports = router;