require('dotenv').config();
const router = require('express').Router();
const DB_student = require('../../DB-codes/users/DB-student-api');
const DB_room = require('../../DB-codes/rooms/DB-room-api');
const DB_seat = require('../../DB-codes/rooms/DB-seat-api');
const DB_seat_history = require('../../DB-codes/rooms/DB-seat-history-api');
const { verifyRoomAccess } = require('../../middlewares/room-verification');


router.get('/all',verifyRoomAccess, async (req,res)=>{   
    res.send(await DB_room.getAllRoomInfo());
});

router.get('/unallocated',verifyRoomAccess, async (req,res)=>{  
    res.send(await DB_seat.getAllUnallocatedSeats());
});

router.post('/allocate',verifyRoomAccess, async (req,res)=>{   
    await DB_seat.allocateSeat(req.body.seat_id, req.body.room_id, req.body.student_id);
    await DB_seat_history.saveAllocationHistory(req.body.seat_id, req.body.room_id, req.body.student_id);
    await DB_student.updateResidencyStatusToResident(req.body.student_id);
    res.send('redirect korte hobe');
});

router.post('/deallocate',verifyRoomAccess, async (req,res)=>{   
    await DB_seat.deallocateSeat(req.body.seat_id, req.body.room_id, req.body.student_id);
    await DB_seat_history.updateDeallocationHistory(req.body.seat_id, req.body.room_id);
    await DB_student.updateResidencyStatusToAttached(req.body.student_id);
    res.send('redirect korte hobe');
});


module.exports = router;