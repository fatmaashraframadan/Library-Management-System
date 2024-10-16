import {
    getUserById,
    getAllUsers,
    AddNewUser,
    updateOneUser,
    deleteOneUser
} from '../services/user.service.js';
import userValidation from '../validators/user.validator.js';

export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message || "Internal server error" });
    }
};

// Paginated
export const getUsersPaginated = async (req, res) => {
    try {
        const validationResult = userValidation.GET_CLIENTS_PAGINATED.validate(
            req.query,
            { abortEarly: false }
        );
        if (validationResult.error) {
            const errorMessage = validationResult.error.details.map((detail) => detail.message).join(", ");

            const error = new Error(errorMessage);
            error.statusCode = 400;
            throw error;
        }

        const page = req.query.page;
        const pageSize = req.query.pageSize;
        const users = await getAllUsers({ page, pageSize });

        res.json(users);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message || "Internal server error" });
    }
};

// Add new user
export const AddUser = async (req, res) => {
    try {
        const newUser = req.body;
        const user = await AddNewUser(newUser);

        res.status(201).json(user);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message || "Internal server error" });
    }
};

// API to get a client by id
export const getUser = async (req, res) => {
    try {
        const validationResult = validationSchema.CREATE_CLIENT.validate(req.body, { abortEarly: false, });
        if (validationResult.error) {
            const errorMessage = validationResult.error.details.map((detail) => detail.message).join(", ");

            const error = new Error(errorMessage);
            error.statusCode = 400;
            throw error;
        }

        const user = await getUserById(req.params.id);
        if (!user) {
            res.status(404).send("User not found");
            return;
        }

        res.json(user);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message || "Internal server error" });
    }
};

// API to update a client by id
export const updateUser = async (req, res) => {
    try {
        const validationResult = userValidation.UPDATE_CLIENT.validate(req.body, { abortEarly: false, });
        if (validationResult.error) {
            const errorMessage = validationResult.error.details.map((detail) => detail.message).join(", ");

            const error = new Error(errorMessage);
            error.statusCode = 400;
            throw error;
        }

        const updatedUser = await updateOneUser(
            req.params.id,
            req.body
        );
        if (!updatedUser) {
            res.status(404).send("User not found");
            return;
        }

        res.sendStatus(204).send(updatedUser);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message || "Internal server error" });
    }
};

// API to delete a client by id
export const deleteUser = async (req, res) => {
    try {
        const deletedUsers = await deleteOneUser(req.params.id);
        if (!deletedUsers) {
            res.status(404).send("User not found");
            return;
        }

        res.sendStatus(204);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message || "Internal server error" });
    }
};
