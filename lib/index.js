'use strict';


module.exports = function (baseClass) {

    class Model extends baseClass {

        static set schema(rawSchema) {

            this.metaSchema = rawSchema.metaSchema;
            this.jSchema = rawSchema.schema;
            if (rawSchema.metaSchema.rids) {
                this.rids = rawSchema.metaSchema.rids;
            }

        }

        static set validator(validator) {

            this.valid = validator;

        }


        validate(cb) {

            const schema = this.constructor.jSchema;
            const validator = this.constructor.valid;
            const metaSchema = this.constructor.metaSchema;

            if (!schema) {
                return cb(new Error(`No schema has been provided for model ${this.constructor.name}`));
            }

            if (!validator) {
                return cb(new Error(`No validator has been provided for model ${metaSchema.name}`));
            }

            validator.validate(this, schema, (err, result) => {

                if (err) {
                    const error = new Error(`JSON schema validation has failed for model ${metaSchema.name}`);
                    error.details = err;
                    return cb(error, null);
                }
                return cb(null, result);
            });
        };
    };

    Model.capabilities.add('validation');
    return Model;
};
