import Book from '../models/book.js';

// Get all books on filter
async function getBooks(filter, options) {
    return await Book.findAll({
        where: filter,
        ...options,
    });
};

// Get all books on filter
async function findBookById(bookId) {
    return await Book.findOne({
        where: { id: bookId }
    });
};

// Get all books on filter
async function addBook(book) {
    return await Book.create(book);
};

// Update book
async function updateBook(bookId, updatedBook) {
    const book = await Book.findByPk(bookId);
    if (book) {
        await book.update(updatedBook);
    } else {
        const error = new Error("Book not found");
        error.statusCode = 404;
        throw error;
    }
}

async function deleteBook(bookId) {
    const book = await Book.findByPk(bookId);
    if (book) {
        return await Book.destroy();
    } else {
        const error = new Error("Book not found");
        error.statusCode = 404;
        throw error;
    }
};

export default {
    getBooks,
    findBookById,
    addBook,
    updateBook,
    deleteBook
};