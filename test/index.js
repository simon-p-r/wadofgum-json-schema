'use strict';

const Code = require('code');
const Lab = require('lab');
const Wadofgum = require('wadofgum');
const Validation = require('../lib/index.js');


// Set-up lab
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('Validation', () => {

    it('should extend from wadofgum mixin', (done) => {

        class User extends Wadofgum.mixin(Validation) {};
        const user = new User();
        expect(user.validate).to.exist();
        done();
    });

    it('errors when attempting to validate a model with no schema', (done) => {

        class User extends Wadofgum.mixin(Validation) {};
        const user = new User();

        user.validate().catch((err) => {

            expect(err).to.exist();
            expect(err.message).to.contain('No schema');
            done();
        });
    });

    it('errors when attempting to validate an invalid model with z-schema', (done) => {

        class User extends Wadofgum.mixin(Validation) {};
        User.schema = {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    format: 'unknown'
                },
                age: {
                    type: 'integer'
                },
                dateOfBirth: {
                    type: 'string',
                    format: 'date'
                }
            }
        };
        const user = new User();

        user.validate().catch((err) => {

            expect(err).to.exist();
            expect(err.message).to.contain('Schema name');
            done();
        }).catch(done);

    });

    it('should successfully validate data against a json schema', (done) => {

        class User extends Wadofgum.mixin(Validation) {};
        User.schema = {
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
        };
        const user = new User({
            name: 'John',
            age: 40,
            dateOfBirth: '1975-10-01'
        });

        user.validate().then(() => {

            expect(user.name).to.equal('John');
            expect(user.age).to.equal(40);
            expect(user.dateOfBirth).to.equal('1975-10-01');
            done();
        }).catch(done);
    });

    it('should fail validation data against a json schema', (done) => {

        class User extends Wadofgum.mixin(Validation) {};
        User.schema = {
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
        };
        const user = new User({
            name: 'John',
            age: 40,
            dateOfBirth: '01/10/1975'
        });

        user.validate().catch((err) => {

            expect(err).to.exist();
            expect(err.message).to.contain('Validation has failed with message');
            done();
        }).catch(done);
    });


});
