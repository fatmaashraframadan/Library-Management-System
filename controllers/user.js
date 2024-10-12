import userService from '../services/user.service.js';

export const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message || "Internal server error" });
    }
};

// Paginated
export const getAllUsers = async (req, res) => {
    try {
        /* const validationResult = validationSchema.GET_CLIENTS_PAGINATED.validate(
             req.query,
             { abortEarly: false }
         );
         if (validationResult.error) {
             const errorMessage = validationResult.error.details.map((detail) => detail.message).join(", ");
 
             const error = new Error(errorMessage);
             error.statusCode = 400;
             throw error;
         }*/

        const page = req.query.page;
        const pageSize = req.query.pageSize;
        const users = await userService.getUsers({ page, pageSize });

        res.json(users);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message || "Internal server error" });
    }
};

// Add new user
export const AddUser = async (req, res) => {
    try {
        const newUser = req.body;
        const user = await clientsService.createClient(newUser);

        res.status(201).json(user);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message || "Internal server error" });
    }
};

// API to get a client by id
export const getUser = async (req, res) => {
    try {
        const user = await userService.getUser(req.params.id);
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
        /*       const validationResult = validationSchema.UPDATE_CLIENT.validate(req.body, {
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
        const updatedUser = await userService.updateUser(
            req.params.id,
            req.body
        );
        if (!updatedUser) {
            res.status(404).send("User not found");
            return;
        }

        res.sendStatus(204).send(updateUser);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message || "Internal server error" });
    }
};

// API to delete a client by id
export const deleteUser = async (req, res) => {
    try {
        const deletedUsers = await userService.deleteUser(req.params.id);
        if (!deletedUsers) {
            res.status(404).send("User not found");
            return;
        }

        res.sendStatus(204);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message || "Internal server error" });
    }
};
