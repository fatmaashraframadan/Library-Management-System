import Joi from 'joi';

const clientSchema = Object.create(null);

clientSchema.CREATE_CLIENT = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
});

clientSchema.UPDATE_CLIENT = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
});

clientSchema.CLIENT_ID = Joi.object({
    id: Joi.string().uuid().required(),
});

clientSchema.GET_CLIENTS_PAGINATED = Joi.object({
    page: Joi.number().integer().required().min(1),
    pageSize: Joi.number().integer().required().min(1),
});

export default clientSchema;