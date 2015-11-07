'use strict';

const Validate = require('./validate.js');

module.exports = function (baseClass) {

    class Model extends baseClass {
        static set schema (rawSchema) {

            Validate.assert('Schema', rawSchema);
            this.meta.set('metaSchema', rawSchema.metaSchema);
            this.meta.set('schema', rawSchema.schema);

        };

        static set validator (validator) {

            this.meta.set('validator', validator);

        };

        validate (cb) {

            if (!this.constructor.meta.has('schema')) {
                return cb(new Error('No schema has been provided for model ' + this.constructor.name));
            }

            if (!this.constructor.meta.has('validator')) {
                return cb(new Error('No validator has been provided for model ' + this.constructor.name));
            }

            const schema = this.constructor.meta.get('schema');
            const validator = this.constructor.meta.get('validator');

            validator.validate(this, schema, (err, result) => {

                if (err) {
                    return cb(new Error('Validation has failed with message ' + err[0].message), null);
                }
                return cb(null, result);
            });
        };
    };

    Model.capabilities.add('validation');
    return Model;
};
