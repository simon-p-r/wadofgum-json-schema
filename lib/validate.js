'use strict';

const Joi = require('joi');
const Hoek = require('hoek');

const internals = {};

exports.assert = (type, schema) => {

    const result = Joi.validate(schema, internals[type]);
    Hoek.assert(!result.error, 'Invalid object passed to schema set method', result.error && result.error.annotate());
    return result.value;
};

internals.Schema = Joi.object({
    metaSchema: Joi.object().keys({
        description: Joi.string(),
        type: Joi.string().required().valid('collection', 'definition', 'record'),
        base: Joi.when('type', {
            is: 'record',
            then: Joi.string().required()
        }),
        jsonSchema: Joi.string().required(),
        name: Joi.string().required(),
        version: Joi.number().required(),
        keys: Joi.alternatives().when('type', {
            is: ['collection', 'record'],
            then: Joi.array().items(Joi.object({
                name: Joi.string(),
                flds: Joi.object(),
                options: Joi.object()
            }))
        })
    }).required(),
    schema: Joi.object({
        properties: Joi.object()
    }).pattern(/^[a-zA-Z]+$/, Joi.any()),
    methods: Joi.object().keys({
        preValidate: Joi.func(),
        postValidate: Joi.func(),
        preSave: Joi.func(),
        postSave: Joi.func()
    })

}).required();
