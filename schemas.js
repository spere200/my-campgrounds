const Joi = require('joi');

const campgroundJSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        images: Joi.array().required(),
        // images: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()
    }).required()
});

const reviewJSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
});

module.exports = {campgroundJSchema, reviewJSchema};