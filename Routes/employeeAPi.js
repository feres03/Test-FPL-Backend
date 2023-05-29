const express = require('express');
const { addemployee, getEmployeeById, employeelist, updateemployee, deleteemployee } = require('../Controllers/employeeControllers');
const router = express.Router()

router.post('/employee', addemployee)
router.get('/employee/:idEmployee', getEmployeeById)
router.get('/employee', employeelist)
router.put('/employee/:id', updateemployee)
router.delete('/employee/:id', deleteemployee)









module.exports = router 