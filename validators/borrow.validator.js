import Joi from 'joi';

const borrowSchema = Object.create(null);

borrowSchema.BORROW_BOOK = Joi.object({
  bookId: Joi.string().uuid().required(),
  userId: Joi.string().uuid().required(),
});

borrowSchema.RETURN_BOOK = Joi.object({
  borrowRecordId: Joi.string().uuid().required(),
});

borrowSchema.GET_User_BORROWING = Joi.object({
  clienuserIdtId: Joi.string().uuid().required(),
});

borrowSchema.BORROWING_HISTORY_PAGINATED = Joi.object({
  page: Joi.number().integer().required().min(1),
  pageSize: Joi.number().integer().required().min(1),
});

export default borrowSchema;