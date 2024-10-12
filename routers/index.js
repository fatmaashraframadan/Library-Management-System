import express from "express";
import bookRoutes from './book-routes.js';
import userRoutes from './user-routes.js';
//import borrowRoutes from './borrow-routes.js';

const router = express.Router();

router.use('/books', bookRoutes);
router.use('/users', userRoutes);
//router.use('/borrow', borrowRoutes);

export default router;