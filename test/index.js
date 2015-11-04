'use strict';

const Code = require('code');
const Hoek = require('hoek');
const Lab = require('lab');
const Wadofgum = require('wadofgum');
const Validation = require('../lib/index.js');

// Fixtures
const PersonSchema = require('./fixtures/person.js');
const PersonData = require('./fixtures/personData.js');

// Set-up lab
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('Validation', () => {

    it('should extend from wadofgum mixin', (done) => {

        class Person extends Wadofgum.mixin(Validation) {};
        const person = new Person();
        expect(person.validate).to.exist();
        done();
    });

    it('should throw if invalid rawSchema used is invalid', (done) => {

        class Person extends Wadofgum.mixin(Validation) {};
        const InvalidSchema = Hoek.clone(PersonSchema);
        delete InvalidSchema.metaSchema;
        expect(() => {

            Person.schema = InvalidSchema;
        }).to.throw(Error);
        done();
    });

    it('errors when attempting to validate a model with no schema', (done) => {

        class Person extends Wadofgum.mixin(Validation) {};
        const person = new Person();

        person.validate((err, result) => {

            expect(err).to.exist();
            expect(err.message).to.contain('No schema');
            done();
        });
    });

    it('errors when attempting to validate an invalid model with z-schema', (done) => {

        class Person extends Wadofgum.mixin(Validation) {};
        const InvalidSchema = Hoek.clone(PersonSchema);
        InvalidSchema.schema.properties.person.properties.salutation.format = 'unknown';
        Person.schema = InvalidSchema;
        const person = new Person();
        person.validate((err, result) => {

            expect(err).to.exist();
            expect(err.message).to.contain('Schema name');
            done();
        });

    });

    it('should successfully validate data against a json schema', (done) => {

        class Person extends Wadofgum.mixin(Validation) {};
        Person.schema = PersonSchema;
        const person = new Person(PersonData);

        person.validate((err, result) => {

            expect(err).to.not.exist();
            expect(person.person.givenName).to.equal('John');
            expect(person.person.dateOfBirth).to.equal('1975-10-01');
            done();
        });
    });

    it('should fail validation with invlaid data against a z-schema', (done) => {

        class Person extends Wadofgum.mixin(Validation) {};
        Person.schema = PersonSchema;
        PersonData.person.dateOfBirth = '01-10-1975';
        const person = new Person(PersonData);

        person.validate((err, result) => {

            expect(err).to.exist();
            expect(err.message).to.contain('Validation has failed with message');
            done();
        });
    });

});
