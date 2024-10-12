import userDal from '../dal/user.dal.js';
import borrowDal from '../dal/book.dal.js';
import Op from 'sequelize';

async function getUser(id) {
    const users = await getUsers({ id });

    if (users.length > 0) {
        return users[0];
    } else {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
}

async function getUsers(query) {
    if (query) {
        const { page, pageSize, ...filter } = query;
        const options = {};
        if (page && pageSize) {
            options.offset = (page - 1) * pageSize;
            options.limit = pageSize;
        }
        return await userDal.listUsers(filter, options);
    }

    return await userDal.listUsers();
}

async function AddUser(user) {
    user.createdAt = new Date();

    return await userDal.addUser(user);
}

async function updateUser(userId, updatedUser) {
    return await userDal.updateUser(userId, updatedUser);
}

async function deleteUser(userId) {
    const borrowings = await borrowDal.getAll({
        userId,
        borrowedAt: {
            [Op.is]: null,
        },
    });
    if (borrowings.length > 0) {
        const error = new Error("User has borrowed books");
        error.statusCode = 400;
        throw error;
    } else {
        await borrowDal.deleteBorrow({ userId });
        return await userDal.deleteUser(userId);
    }
}

module.exports = {
    getUser,
    getUsers,
    AddUser,
    updateUser,
    deleteUser
};