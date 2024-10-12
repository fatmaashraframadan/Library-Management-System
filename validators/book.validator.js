import Joi from 'joi';

const bookSchema = Object.create(null);

bookSchema.CREATE_BOOK = Joi.object({
    title: Joi.string().required(),
    ISBN: Joi.string().required(),
    available_quantity: Joi.number().integer().required(),
    shelf_location: Joi.string().required(),
    author_name: Joi.string().required(),
});

bookSchema.UPDATE_BOOK = Joi.object({
    title: Joi.string().optional(),
    ISBN: Joi.string().optional(),
    available_quantity: Joi.number().integer().optional(),
    shelf_location: Joi.string().optional(),
    author_name: Joi.string().optional(),
});

bookSchema.BOOK_ID = Joi.object({
    id: Joi.string().uuid().required(),
});

bookSchema.GET_BOOKS_PAGINATED = Joi.object({
    page: Joi.number().integer().required().min(1),
    pageSize: Joi.number().integer().required().min(1),
    title: Joi.string().optional(),
    author_name: Joi.string().optional(),
    ISBN: Joi.string().optional()
});

bookSchema.GET_ALL_BOOKS = Joi.object({
    title: Joi.string().optional(),
    author_name: Joi.string().optional(),
    ISBN: Joi.string().optional(),
});

export default bookSchema;