import {
    returnOneBook,
    borrowOneBook,
    getBorrowingHistory,
    getUserBorrowing,
    getAllOverdueBooks
} from '../services/borrow.service.js';

export const getAllBorrowingHistory = async (req, res) => {
    try {
        const borrowingRecords = await getBorrowingHistory();
        res.json(borrowingRecords);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message || "Internal server error" });
    }
}

export const BorrowingPaginated = async (req, res) => {
    try {
        /*  const validationResult =
              validationSchema.BORROWING_HISTORY_PAGINATED.validate(req.query, {
                  abortEarly: false,
              });
          if (validationResult.error) {
              const errorMessage = validationResult.error.details
                  .map((detail) => detail.message)
                  .join(", ");
  
              const error = new Error(errorMessage);
              error.statusCode = 400;
              throw error;
          }*/
        const borrowingRecords = await getBorrowingHistory(req.query);
        res.json(borrowingRecords);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message || "Internal server error" });
    }
}

export const getOverdueBooks = async (req, res) => {
    try {
        const borrowingRecords = await getAllOverdueBooks();
        res.json(borrowingRecords);
    } catch (err) {
        res
            .status(err.statusCode || 500)
            .json({ error: err.message || "Internal server error" });
    }
};

export const getBorrowedBooksByUseId = async (req, res) => {
    try {
        /*const validationResult = validationSchema.GET_CLIENT_BORROWING.validate(
            req.params,
            { abortEarly: false }
        );
        if (validationResult.error) {
            const errorMessage = validationResult.error.details
                .map((detail) => detail.message)
                .join(", ");

            const error = new Error(errorMessage);
            error.statusCode = 400;
            throw error;
        }*/

        const userId = req.params.userId;
        const borrowingRecords = await getUserBorrowing(userId);
        res.json(borrowingRecords);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message || "Internal server error" });
    }
};

export const borrowBook = async (req, res) => {
    try {
        /*  const validationResult = validationSchema.BORROW_BOOK.validate(req.body, {
              abortEarly: false,
          });
          if (validationResult.error) {
              const errorMessage = validationResult.error.details
                  .map((detail) => detail.message)
                  .join(", ");
  
              const error = new Error(errorMessage);
              error.statusCode = 400;
              throw error;
          }*/

        const createdBorrowingRecord = await borrowOneBook(req.body);

        res.status(201).json(createdBorrowingRecord);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message || "Internal server error" });
    }
};

export const returnBook = async (req, res) => {
    try {
        /* const validationResult = validationSchema.RETURN_BOOK.validate(req.params, {
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
     */
        const borrowRecordId = req.params.borrowRecordId;
        const updatedBorrow = await returnOneBook(borrowRecordId);

        res.json(updatedBorrow);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message || "Internal server error" });
    }
};