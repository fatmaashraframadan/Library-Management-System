import express from "express";

import {
    getUsers,
    AddUser,
    getUser,
    updateUser,
    deleteUser,
    getUsersPaginated
} from "../controllers/user.js";

const router = express.Router();

router.route("/")
    .get(getUsers)
    .post(AddUser);

router.route("/all")
    .get(getUsersPaginated)

router.route("/:id")
    .delete(deleteUser)
    .put(updateUser)
    .get(getUser)

export default router;