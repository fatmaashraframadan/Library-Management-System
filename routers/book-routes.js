import express from "express";

import {
    addOneBook,
    deleteOneBook,
    listAllBooks,
    listBooks,
    getOneBook,
    updateOneBook
} from "../controllers/book.js";

const router = express.Router();

router.route("/")
    .get(listBooks)
    .post(addOneBook)

// list books - paginated
router.route("/all")
    .get(listAllBooks)

router.route("/:id")
    .get(getOneBook)
    .delete(deleteOneBook)
    .put(updateOneBook)

export default router;