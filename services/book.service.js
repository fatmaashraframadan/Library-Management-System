import bookDal from '../dal/book.dal.js';
import borrowDal from '../dal/borrow.dal.js';

export async function getBook(id) {
    const book = bookDal.findBookById(id);
    if (book != null) {
        return book;
    } else {
        const error = new Error("Book not found");
        error.statusCode = 404;
        return error;
    }
}

export async function getBooks(query) {
    const { page, pageSize, ...filter } = query;
    const options = {};

    if (page && pageSize) {
        options.offset = (page - 1) * pageSize;
        options.limit = pageSize;
    }
    return await bookDal.getBooks(filter, options);
};

export async function updateBook(bookId, updatedBook) {
    return await bookDal.updateBook(bookId, updatedBook);
};

export async function addBook(book) {
    return await bookDal.addBook(book);
};

// Service to delete a book by id
export async function deleteBook(bookId) {
    const borrowings = await borrowDal.getAll({
        bookId,
        borrowedAt: {
            [Op.is]: null,
        },
    });

    if (borrowings.length > 0) {
        const error = new Error("Book is borrowed");
        error.statusCode = 400;
        throw error;
    } else {
        await borrowDal.deleteBorrow({ bookId });
        return await bookDAL.deleteBook(bookId);
    }
}