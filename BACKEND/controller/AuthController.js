const register = require('../model/AuthModel');
const log = require('../model/LogModel');
const sesModel = require('../model/SessionModel');
const perModel = require('../model/PermissionModel');
const permissionCheckModel = require('../model/PermissionCheckboxModel');
const jwt = require('jsonwebtoken');
const changedThePassword = require('../actions/activity');
require('dotenv').config();
const secret = process.env.JWT_SECRET;
const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

const generateToken = (user) => {
    const payload = {
        email: user.email,
        id: user.id,
        logtime: user.logtime,
        role: user.role
    };
    const time = { expiresIn: '1d' };
    return jwt.sign(payload, secret, time);
};

const PostLogin = async (req, res) => {
    try {
        const { email: userEmail, password } = req.body;

        if (!userEmail) {
            return res.status(400).send('Email is required');
        }

        const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
        if (!emailRegex.test(userEmail)) {
            return res.status(400).send('Email address is not valid');
        }

        if (!password) {
            return res.status(400).send('Password is required');
        }

        const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
        if (!passRegex.test(password)) {
            return res.status(400).send('Password is not valid');
        }

        const logUser = await register.findOne({ email: userEmail });
        if (!logUser) {
            return res.status(404).send('User not found');
        }

        if (logUser.role === 'no') {
            return res.status(404).send('You have not been Authorised yet.\nPlease wait for Admin');
        }

        const userRole = logUser.role;
        const rolePerms = await perModel.findOne({name:userRole});
        const perms = rolePerms.roleAccess;

        const isMatched = await comparePassword(password, logUser.password);
        if (!isMatched) {
            return res.status(400).send('Invalid Credentials');
        }
        const existUser = await register.findOne({ email: userEmail });
        const loginTime = new Date().getTime();
        const existUserID = existUser._id;
        const existUserEmail = existUser.email
        const token = generateToken({ email: existUserEmail, id: existUserID, logtime: loginTime, role: logUser.role });
        let created = new Date().getTime();
        let updated = new Date(created).getTime();
        const sessionofUser = await sesModel.create({ userId: existUserID, email: userEmail, token: token, createdAt: created, updatedAt: updated })
        const logofUser = await log.create({ userId: existUserID, email: userEmail, loginTime: loginTime, actions: [] });
        res.status(200).json({ token: token, email: userEmail,permissions:perms});
    } catch (error) {
        console.error("Error while finding user:", error);
        return res.status(500).send('Server Error');
    }
}

const PostRegister = async (req, res) => {
    try {
        const { name: userName, email: userEmail, password: userPass, cfpassword: usercPass, role: userRole } = req.body;

        if (!userName || !userEmail || !userPass || !usercPass) {
            return res.status(400).send('All fields are required');
        }

        const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
        if (!emailRegex.test(userEmail)) {
            return res.status(400).send('Email address is not valid');
        }

        const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
        if (!passRegex.test(userPass)) {
            return res.status(400).send('Password is not valid');
        }

        if (userPass !== usercPass) {
            return res.status(400).send('Passwords should match');
        }

        const existUser = await register.findOne({ email: userEmail });
        if (existUser) {
            console.log('User already exists');
            return res.status(409).send('User already registered with the email');
        }

        const hashedPassword = await hashPassword(userPass);
        let created = new Date().getTime();
        let updated = new Date(created).getTime();
        const registerUser = await register.create({ name: userName, email: userEmail, password: hashedPassword, createdAt: created, updatedAt: updated, role: userRole });
        res.status(201).send('User registered successfully');
    } catch (err) {
        console.log('Some error occurred ', err);
        res.status(500).send('Server Error');
    }
}

const getDashboard = async (req, res) => {
    try {
        console.log(req.body);
        const authHeader = req.headers && req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const userRole = decodedToken.role;
        let flag = false;
        if(userRole == 'SuperAdmin'){
            flag = true;
        }
        const perms = await perModel.findOne({ name: userRole });
        if (perms && perms.roleAccess && (perms.roleAccess.includes('Dashboard')) || flag===true) {
            const userEmail = decodedToken.email;
            const loggedUser = await register.findOne({ email: userEmail });
            if (loggedUser) {
                const username = loggedUser.name;
                const logs = await log.find();
                res.status(200).json({ logs: logs, name: username });
            } else {
                res.status(404).send('User not found');
            }
        } else {
            res.status(403).send('Not Allowed');
        }
    } catch (err) {
        console.error('Error fetching logs:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const logout = async (req, res) => {
    try {
        const { email: userEmail } = req.body;
        const currUser = await sesModel.findOneAndDelete({ email: userEmail });
        res.status(200).json({ success: true })
    } catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const changePassword = async (req, res) => {
    try {
        const { email: userEmail, password: currPass, newpassword: nPass, newcfpassword: cfPass } = req.body;

        if (!userEmail || !currPass || !nPass || !cfPass) {
            return res.status(400).send('All fields are required');
        }
        const user = await register.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const isMatched = await comparePassword(currPass, user.password);
        if (!isMatched) {
            return res.status(400).send('Current password is incorrect');
        }
        if (nPass !== cfPass) {
            return res.status(400).send('New passwords do not match');
        }
        const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
        if (!passRegex.test(nPass)) {
            return res.status(400).send('New password is not valid');
        }
        const hashedPassword = await hashPassword(nPass);
        user.password = hashedPassword;
        user.updatedAt = new Date().getTime();
        await user.save();
        const authHeader = req.headers && req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const objectId = decodedToken ? decodedToken.id : null;
        const loginTime = decodedToken ? decodedToken.logtime : null;
        const loggedUser = await log.findOne({ userId: objectId, loginTime: loginTime });
        loggedUser.actions.push('Changed Password');
        await loggedUser.save();
        res.status(200).send('Password changed successfully');
    } catch (err) {
        console.error('Error while changing password:', err);
        res.status(500).send('Internal Server Error');
    }
}




const getAdminDetails = async (req, res) => {
    try {
        const userAdmins = await register.find({ superAdmin: false });
        const authHeader = req.headers && req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const userRole = decodedToken.role;
        let flag = false;
        if(userRole == 'SuperAdmin'){
            flag = true;
        }
        const perms = await perModel.findOne({ name: userRole });
        if (perms && perms.roleAccess && (perms.roleAccess.includes('RolePermission')) || flag===true) {
        const userEmail = decodedToken.email;
        const loggedUser = await register.findOne({ email: userEmail });
        let superControl = false;
        if (loggedUser.superAdmin) {
            superControl = true;
        };
        const allRoles = await perModel.find({ name: { $ne: 'SuperAdmin' } });
        res.status(200).json({ admins: userAdmins, control: superControl,roles : allRoles });
    }else{
        res.status(500).send('Not Allowed');
    }
    }
    catch (err) {
        console.error('Error while getting users:', err);
        res.status(500).send('Internal Server Error');
    }


}


const editRoleUser = async (req, res) => {
    try {
        const authHeader = req.headers && req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const userRole = decodedToken.role;
        let flag = false;
        if(userRole == 'SuperAdmin'){
            flag = true;
        }
        const perms = await perModel.findOne({ name: userRole });
        if (perms && perms.roleAccess && (perms.roleAccess.includes('RolePermission')) || flag===true) {
        const { formdata: userRole, userEmail: userEmail } = req.body;
        let updatedRole = [];
        userRole.role.forEach(element => {
            updatedRole.push(element.item_text);
        });
        console.log(updatedRole);

        const user = await register.findOneAndUpdate({ email: userEmail }, { roleAccess: updatedRole });
        res.status(200).send('Roles Updated');
    }
    else{
        res.status(500).send('Not Allowed');
    }
    } catch (err) {
        console.error('Error while updating roles', err);
        res.status(500).send('Internal Server Error');
    }
}

const changeUserRole = async (req, res) => {
    try {
        const authHeader = req.headers && req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const userRoles = decodedToken.role;
        let flag = false;
        if(userRoles == 'SuperAdmin'){
            flag = true;
        }
        const perms = await perModel.findOne({ name: userRoles });
        if (perms && perms.roleAccess && (perms.roleAccess.includes('RolePermission')) || flag===true) {
        const { email: userEmail, role: userRole } = req.body;
        const user = await register.findOneAndUpdate({ email: userEmail }, { role: userRole });
        console.log(user);
        res.status(200).send('Roles Updated');
        }
        else{
            res.status(500).send('Not Allowed');
        }
    } catch (err) {
        console.error('Error while updating roles', err);
        res.status(500).send('Internal Server Error');
    }
}


const getRolePermissions = async (req, res) => {
    try {
        const authHeader = req.headers && req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const userRole = decodedToken.role;
        let flag = false;
        if(userRole == 'SuperAdmin'){
            flag = true;
        }
        const perms = await perModel.findOne({ name: userRole });
        if (perms && perms.roleAccess && (perms.roleAccess.includes('RolePermission')) || flag===true) {
            const userPerms = await perModel.find({ name: { $ne: 'SuperAdmin' } });
            const userEmail = decodedToken.email;
        const loggedUser = await register.findOne({ email: userEmail });
        let superControl = false;
        if (loggedUser.superAdmin) {
            superControl = true;
        };
        res.status(200).json({ permissions: userPerms, control: superControl })
    }else{
        res.status(500).send('Not Allowed');
    }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }

}

const editRolePermission = async (req, res) => {
    try {
        const authHeader = req.headers && req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const userRole = decodedToken.role;
        let flag = false;
        if(userRole == 'SuperAdmin'){
            flag = true;
        }
        const perms = await perModel.findOne({ name: userRole });
        if (perms && perms.roleAccess && (perms.roleAccess.includes('RolePermission')) || flag===true) {
        const { formdata, roleName } = req.body;
        const roleAccess = formdata.role.map(item => item.item_text);
        console.log(roleAccess);
        await perModel.findOneAndUpdate({ name: roleName }, { roleAccess: roleAccess });
        res.status(200).send('Role permissions updated successfully');
        }else{
            res.status(500).send('Not Allowed');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};


const getNavbarPermission = async (req, res) => {
    try {
        const authHeader = req.headers && req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const userRole = decodedToken.role;
        let flag = false;
        if (userRole === 'SuperAdmin') { flag = true }
        let permissions = await perModel.findOne({ name: userRole });
        if (!permissions) {
            permissions = [];
        }
        const userRoleAccess = permissions.roleAccess;
        res.status(200).json({ access: userRoleAccess, control: flag });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

const addRole = async (req, res) => {
    try {
        const authHeader = req.headers && req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const userRole = decodedToken.role;
        let flag = false;
        if(userRole == 'SuperAdmin'){
            flag = true;
        }
        const perms = await perModel.findOne({ name: userRole });
        if (perms && perms.roleAccess && (perms.roleAccess.includes('RolePermission')) || flag===true) {
        const { name: name } = req.body;
        const checkRole = await perModel.findOne({ name: name });
        if (!checkRole) {
            await perModel.create({ name: name, roleAccess: [] });
            return res.status(200).send('Role Created');
        }

        return res.status(500).send('Role already Exists');
    }else{
        res.status(500).send('Not Allowed');
    }

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}


const getPermissionCheckBox = async(req,res) => {
    try{
        const perms = await permissionCheckModel.find();
        res.status(200).send({perms:perms});
    }catch(err)
    {
        console.log(err);
        res.status(500).send('Interal Server Error');
    }
}

const postPermissionCheckbox = async(req,res) =>{
    try{

    }catch(err){
        console.log(err);
        res.status(500).send('Interal Server Error');
    }
}


module.exports = { PostLogin, PostRegister, getDashboard, logout, changePassword, getAdminDetails, editRoleUser, changeUserRole, getRolePermissions, editRolePermission, getNavbarPermission, addRole,getPermissionCheckBox,postPermissionCheckbox };
