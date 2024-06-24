const express = require('express');
const router = express.Router();
const { PostLogin, PostRegister,getDashboard,logout,changePassword,getAdminDetails,editRoleUser,changeUserRole,getRolePermissions,editRolePermission, getNavbarPermission,addRole,getPermissionCheckBox,postPermissionCheckbox,getAdminInfo,postAdminInfo, getEditPagePermission, getAddRole} = require('../controller/AuthController');
const {authenticateToken} = require('../middleware/Authentication');
const {uploadSingleFile} = require('../middleware/Multer');

router.post('/login',PostLogin);
router.post('/register',PostRegister);
router.get('/dashboard',authenticateToken,getDashboard);
router.post('/logout',logout)
router.post('/changepassword',authenticateToken,changePassword)
router.post('/user-edit',authenticateToken,editRoleUser)
router.get('/user-roles',authenticateToken,getAdminDetails);
router.post('/user-roles',authenticateToken,changeUserRole);
router.get('/role-permissions',authenticateToken,getRolePermissions);
router.post('/role-edit',authenticateToken,editRolePermission)
router.get('/navbar-permission',authenticateToken,getNavbarPermission);
//add roles
router.get('/add-role',authenticateToken,getAddRole)
router.post('/add-role',authenticateToken,addRole);

//new permission
router.get('/page-permission',authenticateToken,getPermissionCheckBox)
router.post('/page-permission',authenticateToken,postPermissionCheckbox);

router.get('/page-permission/edit-permission',authenticateToken,getEditPagePermission);

//info page
router.get('/admin-info',authenticateToken,getAdminInfo);
router.post('/admin-info',authenticateToken,uploadSingleFile,postAdminInfo)

module.exports = router;
