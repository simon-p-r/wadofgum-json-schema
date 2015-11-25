'use strict';

const Code = require('code');
// const Hoek = require('hoek');
const Lab = require('lab');
const Wadofgum = require('wadofgum');
const Validation = require('../lib/index.js');
const ZSchema = require('z-schema');
const Validator = new ZSchema();

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

    it('should validate a simple schema', (done) => {

        class Person extends Wadofgum.mixin(Validation) {};
        Person.schema = {
            metaSchema: {
                name: 'test',
                type: 'record',
                jsonSchema: 'v4',
                version: 1,
                base: 'example'
            },
            schema: {
                recType: {
                    type: 'string'
                }
            }
        };
        Person.validator = Validator;
        const person = new Person({
            recType: 'test'
        });
        person.validate((err, result) => {

            expect(err).to.not.exist();
            expect(result).to.be.true();
            done();
        });
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

    it('errors when attempting to validate without a validator property set on class object', (done) => {

        class Person extends Wadofgum.mixin(Validation) {};
        Person.schema = PersonSchema;
        const person = new Person();
        person.validate((err, result) => {

            expect(err).to.exist();
            expect(err.message).to.contain('No validator');
            done();
        });

    });

    it('should successfully validate data against a json schema', (done) => {

        class Person extends Wadofgum.mixin(Validation) {};
        Person.schema = PersonSchema;
        Person.validator = Validator;
        const person = new Person(PersonData);

        person.validate((err, result) => {

            expect(err).to.not.exist();
            expect(person.person.givenName).to.equal('John');
            expect(person.person.dateOfBirth).to.equal('1975-10-01');
            done();
        });
    });

    it('should fail validation with invalid data against a z-schema', (done) => {

        const Person = class extends Wadofgum.mixin(Validation) {};
        Person.schema = PersonSchema;
        Person.validator = Validator;
        PersonData.person.dateOfBirth = '01-10-1975';
        const person = new Person(PersonData);

        person.validate((err, result) => {

            expect(err).to.exist();
            expect(err.message).to.contain('JSON schema validation has failed');
            expect(err.details).to.be.an.array();
            done();
        });
    });

});
