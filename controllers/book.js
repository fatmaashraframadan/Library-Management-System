import {
    deleteBook,
    addBook,
    getBooks,
    getBook,
    updateBook
} from '../services/book.service.js';
import bookValidation from '../validators/book.validator.js';

export const addOneBook = async (req, res) => {
    try {
        const { title, userId, ISBN, available_quantity, shelf_location } = req.body;
        const book = await addBook({ title, userId, ISBN, available_quantity, shelf_location });
        return res.status(201).json({ message: "book created successfully", data: book });
    } catch (error) {
        return res.status(500).json({ message: `error ${error}` });
    }
};

export const deleteOneBook = async (req, res) => {
    try {
        const validationResult = bookValidation.BOOK_ID.validate(req.params, {
            abortEarly: false,
        });
        if (validationResult.error) {
            const errorMessage = validationResult.error.details
                .map((detail) => detail.message)
                .join(", ");

            const error = new Error(errorMessage);
            error.statusCode = 400;
            throw error;
        }

        const id = req.params.id;
        await deleteBook(id);

        res.sendStatus(204);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message || "Internal server error" });
    }
};

export const updateOneBook = async (req, res) => {
    try {
        const validationResult = bookValidation.BOOK_ID.validate(req.params, {
            abortEarly: false,
        });
        if (validationResult.error) {
            const errorMessage = validationResult.error.details.map((detail) => detail.message).join(", ");

            const error = new Error(errorMessage);
            error.statusCode = 400;
            throw error;
        }

        const validationResult2 = bookValidation.UPDATE_BOOK.validate(req.body, {
            abortEarly: false,
        });
        if (validationResult2.error) {
            res.status(400).send(validationResult2.error.details[0].message);
            return;
        }

        const id = req.params.id;
        const updatedBook = req.body;

        await updateBook(id, updatedBook);
        res.sendStatus(204);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message || "Internal server error" });
    }
};

export const getOneBook = async (req, res) => {
    try {
        const validationResult = bookValidation.BOOK_ID.validate(req.params, {
            abortEarly: false,
        });
        if (validationResult.error) {
            const errorMessage = validationResult.error.details.map((detail) => detail.message).join(", ");

            const error = new Error(errorMessage);
            error.statusCode = 400;
            throw error;
        }

        const id = req.params.id;
        const book = await getBook(id);

        res.status(200).json(book);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message || "Internal server error" });
    }
};

export const listBooks = async (req, res) => {
    try {
        const validationResult = bookValidation.GET_ALL_BOOKS.validate(
            req.query,
            { abortEarly: false }
        );
        if (validationResult.error) {
            const errorMessage = validationResult.error.details
                .map((detail) => detail.message).join(", ");

            const error = new Error(errorMessage);
            error.statusCode = 400;
            throw error;
        }

        const books = await getBooks(req.query);
        res.json(books);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message || "Internal server error" });
    }
}

// paginated
export const listAllBooks = async (req, res) => {
    try {
        const validationResult = bookValidation.GET_BOOKS_PAGINATED.validate(
            req.query,
            { abortEarly: false }
        );
        if (validationResult.error) {
            const errorMessage = validationResult.error.details
                .map((detail) => detail.message)
                .join(", ");

            const error = new Error(errorMessage);
            error.statusCode = 400;
            throw error;
        }

        const page = req.query.page;
        const pageSize = req.query.pageSize;
        const books = await getBooks(req.query);

        res.json(books);
    } catch (err) {
        res
            .status(err.statusCode || 500)
            .json({ error: err.message || "Internal server error" });
    }
}