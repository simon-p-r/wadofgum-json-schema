'use strict';

const ZSchema = require('z-schema');

module.exports = function (baseClass) {

    class Model extends baseClass {
        static set schema (jsonSchema) {

            const schema = jsonSchema;
            this.meta.set('schema', schema);
            this.meta.set('validator', new ZSchema());

        };

        validate (cb) {

            if (!this.constructor.meta.has('schema')) {
                return cb(new Error('No schema has been provided for model ' + this.constructor.name));
            }

            const schema = this.constructor.meta.get('schema');
            const validator = this.constructor.meta.get('validator');
            const valid = validator.validateSchema(schema);

            if (!valid) {
                return cb(new Error('Schema name ' + this.constructor.name + ' is not valid'));
            }
            validator.validate(this, schema, (err, result) => {

                if (err) {
                    return cb(new Error('Validation has failed with message ' + err[0].message));
                }
                return cb(null, this);
            });
        };
    };

    Model.capabilities.add('validation');
    return Model;
};
