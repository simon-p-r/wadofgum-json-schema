'use strict';

const Validate = require('./validate.js');
const ZSchema = require('z-schema');

module.exports = function (baseClass) {

    class Model extends baseClass {
        static set schema (rawSchema) {

            Validate.assert('Schema', rawSchema);
            this.meta.set('metaSchema', rawSchema.metaSchema);
            this.meta.set('schema', rawSchema.schema);
            this.meta.set('validator', new ZSchema());

        };

        validate (cb) {

            if (!this.constructor.meta.has('schema')) {
                return cb(new Error('No schema has been provided for model ' + this.constructor.name));
            }
            const metaSchema = this.constructor.meta.get('metaSchema');
            const schema = this.constructor.meta.get('schema');
            const validator = this.constructor.meta.get('validator');
            const valid = validator.validateSchema(schema);

            if (!valid) {
                return cb(new Error('Schema name ' + metaSchema.name + ' has failed validation with z-schema'));
            }
            validator.validate(this, schema, (err, result) => {

                if (err) {
                    return cb(new Error('Validation has failed with message ' + err[0].message));
                }
                return cb();
            });
        };
    };

    Model.capabilities.add('validation');
    return Model;
};
