require('dotenv').config();
const router = require('express').Router();
const DB_user = require('../../DB-codes/users/DB-user-api');
const DB_student = require('../../DB-codes/users/DB-student-api');
const DB_room = require('../../DB-codes/rooms/DB-room-api');
const DB_seat = require('../../DB-codes/rooms/DB-seat-api');
const DB_seat_history = require('../../DB-codes/rooms/DB-seat-history-api');
const { verifyRoomAccess } = require('../../middlewares/room-verification');


router.get('/all',verifyRoomAccess, async (req,res)=>{   
    const rooms = await DB_room.getAllRoomInfo();
    const user = await DB_user.getUserById(req.user.id);
    res.render('layout.ejs', {
            title : "Floor Map",
            body : ['floormap/allrooms'],
            rooms: rooms,
            user2 : user,
            cur_user_id : req.user.id
        });
});

router.get('/unallocated',verifyRoomAccess, async (req,res)=>{  
    const rooms = await DB_seat.getAllUnallocatedSeats();
    const user = await DB_user.getUserById(req.user.id);
    console.log(req.query.student_id);
    console.log(rooms);
    res.render('layout.ejs', {
            title : "Unallocated Seats",
            body : ['floormap/unallocated'],
            rooms: rooms,
            user2: user,
            student_id : req.query.student_id,
            cur_user_id : req.user.id
        });
});

router.post('/allocate/:id',verifyRoomAccess, async (req,res)=>{   
    await DB_seat.allocateSeat(req.body.seat_id, req.body.room_id, req.params.id);
    await DB_seat_history.saveAllocationHistory(req.body.seat_id, req.body.room_id, req.params.id);
    await DB_student.updateResidencyStatusToResident(req.params.id);
    res.redirect('/api/application/all_approved');
});

router.post('/deallocate',verifyRoomAccess, async (req,res)=>{   
    await DB_seat.deallocateSeat(req.body.seat_id, req.body.room_id, req.body.student_id);
    await DB_seat_history.updateDeallocationHistory(req.body.seat_id, req.body.room_id);
    await DB_student.updateResidencyStatusToAttached(req.body.student_id);
    res.send('redirect korte hobe');
});


module.exports = router;