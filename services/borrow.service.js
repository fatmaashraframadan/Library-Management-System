import {
    getUserById
} from '../services/user.service.js';
import {
    getBook,
    updateBook
} from '../services/book.service.js';
import borrowDal from '../dal/borrow.dal.js';
import Op from 'sequelize';

// Service to get overdue books
export async function getAllOverdueBooks() {
    const query = {
        borrowedAt: {
            [Op.not]: null
        },
        dueDate: {
            [Op.lt]: new Date(),
        },
    };
    return await borrowDal.getAll(query);
}

// Service to get user's currently borrowed books
export async function getUserBorrowing(userId) {
    const user = await getUserById(userId);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const query = {
        borrowedAt: {
            [Op.not]: null
        }, userId,
    };
    return await borrowDal.getAll(query);
}

// Service to get borrowing history
export async function getBorrowingHistory(query) {
    if (query) {
        const { page, pageSize, ...filter } = query;
        const options = {};
        if (page && pageSize) {
            options.offset = (page - 1) * pageSize;
            options.limit = pageSize;
        }
        return await borrowDal.getAll(filter, options);
    }
    return await borrowDal.getAll();
}

// Service to add new record for borrowed book
export async function borrowOneBook(borrow) {
    borrow.borrowedAt = new Date();

    borrow.dueDate = new Date();
    // month from now
    borrow.dueDate.setDate(borrow.dueDate.getDate() + 30);
    borrow.isReturned = false;

    const user = await getUserById(borrow.userId);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const book = await getBook(borrow.bookId);
    if (!book) {
        const error = new Error("Book not found");
        error.statusCode = 404;
        throw error;
    }

    if (book.available_quantity <= 0) {
        const error = new Error("Book not available");
        error.statusCode = 400;
        throw error;
    }

    const updateStatement = {
        available_quantity: book.dataValues.available_quantity - 1,
    };

    await updateBook(borrow.bookId, updateStatement);

    return await borrowDal.create(borrow);
}

// Service to return book
// make borrowed at null
export async function returnOneBook(borrowRecordId) {
    const query = {
        id: borrowRecordId,
    };

    const borrowedRecord = await borrowDal.findOne(query);

    if (!borrowedRecord) {
        const error = new Error("Borrowed record not found");
        error.statusCode = 404;
        throw error;
    }

    if (borrowedRecord.isReturned) {
        const error = new Error("Book already returned");
        error.statusCode = 400;
        throw error;
    }

    const book = await bookService.getBook(borrowedRecord.bookId);
    if (!book) {
        const error = new Error("Book not found");
        error.statusCode = 404;
        throw error;
    }

    const bookUpdateStatement = {
        available_quantity: book.dataValues.available_quantity + 1,
    };

    await bookService.updateBook(borrowedRecord.bookId, bookUpdateStatement);

    const updateStatement = {
        returnedAt: new Date(),
        isReturned: true,
        borrowedAt: new Date(),
    };

    return await borrowDal.update(query, updateStatement);
}