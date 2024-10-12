import express from "express";

import {
    getAllBorrowingHistory,
    BorrowingPaginated,
    getOverdueBooks,
    getBorrowedBooksByUseId,
    borrowBook,
    returnBook
} from "../controllers/borrow.js";

const router = express.Router();

router.route("/")
    .get(getAllBorrowingHistory)
    .post(borrowBook)

router.route("/overdue")
    .get(getOverdueBooks)

// list books - paginated
router.route("/all")
    .get(BorrowingPaginated)

router.route("/:id")
    .get(getBorrowedBooksByUseId)
    .post(returnBook)


export default router;