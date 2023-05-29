const express = require('express');
const { addmission, missionbyid, missionlist, updatemission, deletemission, affecte, dessafecte } = require('../Controllers/missionConrollers');
const router = express.Router();

router.post('/mission', addmission)
router.get('/mission/:idMission', missionbyid)
router.get('/mission', missionlist)
router.put('/mission/:id', updatemission)
router.delete('/mission/:id', deletemission)
router.put('/affect/:idMission/:idEmployee', affecte)
router.put('/dessafect/:idMission/:idEmployee', dessafecte)







module.exports = router;