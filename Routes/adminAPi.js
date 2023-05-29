const express = require('express');
const { Register, login, getadmin, updateadmin, deleteadmin, forgetPassword, resetPassword } = require('../Controllers/adminControllers');
const router = express.Router();

router.post('/register', Register)
router.post('/login', login)
router.post('/forgotPassword', forgetPassword);
router.post('/resetPassword/:token', resetPassword);
router.get('/admin', getadmin);
router.put('/admin/:id', updateadmin);
router.delete('/admin/:id', deleteadmin);


module.exports = router