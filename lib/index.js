'use strict';

const ZSchema = require('z-schema');

module.exports = function (baseClass) {

    class Model extends baseClass {
        static set schema (jsonSchema) {

            const schema = jsonSchema;
            this.meta.set('schema', schema);
            this.meta.set('validator', new ZSchema());

        };

        validate () {

            const self = this;
            return new Promise((resolve, reject) => {

                if (!this.constructor.meta.has('schema')) {
                    return reject(new Error('No schema has been provided for model ' + this.constructor.name));
                }

                const schema = this.constructor.meta.get('schema');
                const validator = this.constructor.meta.get('validator');
                const valid = validator.validateSchema(schema);

                if (!valid) {
                    return reject(new Error('Schema name ' + this.constructor.name + ' is not valid'));
                }
                validator.validate(self, schema, (err, result) => {

                    if (err) {
                        return reject(new Error('Validation has failed with message ' + err[0].message));
                    }
                    return resolve(self);
                });
            });
        };
    };

    Model.capabilities.add('validation');
    return Model;
};
