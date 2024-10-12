import express from "express";

import {
    getUsers,
    getAllUsers,
    AddUser,
    getUser,
    updateUser,
    deleteUser
} from "../controllers/user.js";

const router = express.Router();

router.route("/")
    .get(getUsers)
    .post(AddUser);

router.route("/all")
    .get(getAllUsers)

router.route("/:id")
    .delete(deleteUser)
    .put(updateUser)
    .get(getUser)
