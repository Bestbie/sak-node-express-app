const User = require('../models/user');

async function getTotalUserService() {
    return await User.count();
}

async function getUserByPermissionService(permission) {
    const user = await User.findAll({
        attributes: {exclude: ['password']},
        where: {
            permission: permission
        }
    });    
    return user;
}

module.exports = { getTotalUserService, getUserByPermissionService };
