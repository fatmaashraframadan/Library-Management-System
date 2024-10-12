import User from '../models/user.js';

async function addUser(user) {
    return await User.create(user);
}

async function listUsers(filter, options) {
    return await User.findAll({
        where: filter,
        ...options
    });
}

async function updateUser(userId, updatedUser) {
    const user = await User.findByPk(userId);
    if (user) {
        return await User.update(updatedUser);
    } else {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
}

async function deleteUser(userId) {
    const user = await User.findByPk(userId);
    if (user) {
        return await User.destroy();
    } else {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
};

export default {
    addUser,
    listUsers,
    updateUser,
    deleteUser
};