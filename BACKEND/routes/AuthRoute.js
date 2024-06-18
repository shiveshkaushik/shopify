const express = require('express');
const router = express.Router();
const { PostLogin, PostRegister,getDashboard,logout,changePassword,getAdminDetails,editRoleUser,changeUserRole} = require('../controller/AuthController');
const {authenticateToken} = require('../middleware/Authentication');

router.post('/login',PostLogin);
router.post('/register',PostRegister);
router.get('/dashboard',authenticateToken,getDashboard);
router.post('/logout',logout)
router.post('/changepassword',authenticateToken,changePassword)
router.get('/users',authenticateToken,getAdminDetails);
router.post('/user-edit',authenticateToken,editRoleUser)
router.get('/user-roles',authenticateToken,getAdminDetails);
router.post('/user-roles',authenticateToken,changeUserRole);

module.exports = router;
