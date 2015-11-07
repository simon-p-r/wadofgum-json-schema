## wadofgum-json-schema [![Build Status](https://travis-ci.org/simon-p-r/wadofgum-json-schema.svg)](https://travis-ci.org/simon-pr/wadofgum-json-schema)

A validation mixin for [wadofgum](https://github.com/nlf/wadofgum) using [z-schema](https://github.com/zaggino/z-schema).

### Usage

After extending your model with this mixin, instances of your class will have a `validate` method which accepts a callback as its only parameter.

Simply provide a json schema for validation and then assign it to the static `schema` property on your class.

```js
const Wadofgum = require('wadofgum');
const Validation = require('wadofgum-json-schema');
const ZSchema = require('z-schema');
const Validator = new ZSchema();


class Model extends Wadofgum.mixin(Validation) {};

// Set schema property to class object
Model.schema = {
    metaSchema: {
        description: 'Person record schema',
        type: 'record',
        base: 'entity',
        jsonSchema: 'v4',
        name: 'person',
        version: 1
    },
    schema: {
        type: 'object',
        properties: {
            name: {
                type: 'string'
            },
            age: {
                type: 'integer'
            },
            dateOfBirth: {
                type: 'string',
                format: 'date'
            }
        }
    }

};

// Set validator object to class object
Model.validator = Validator;

let model = new Model({ name: 'test', age: '45', dateOfBirth: '1975-10-01'});
model.validate((err, result) => {
    model.name; // 'test'
    model.age; // 45
    model.dateOfBirth; // '1975-10-01'
});
```
