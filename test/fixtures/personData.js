'use strict';

module.exports = {

    recType: 'person',
    person: {
        salutation: 'Mr',
        givenName: 'John',
        familyName: 'Smith',
        dateOfBirth: '1975-10-01',
        placeOfBirth: 'London',
        passport: {
            number: '123456'
        },
        homeAddress: {
            buildingName: 'Johns house',
            buildingNumber: '4',
            locality: 'London',
            postCode: 'N12 3RH',
            postTown: 'London',
            thoroughfarse: 'Station Road',
            county: {
                cn: 'county',
                q: 'Greater London'
            }
        },
        phone: {
            countryCode: '+44',
            areaCode: '0203',
            localNumber: '1002001'
        },
        mobile: {
            countryCode: '+44',
            areaCode: '0203',
            localNumber: '1002001'
        },
        email: {
            addr: 'john@smith.me'
        }
    },
    control: {
        createdAt: 'Wed Nov 04 2015 12:06:31 GMT+0000 (GMT Standard Time)',
        createdBy: {
            cn: 'admin',
            q: 'another query'
        },
        id: '',
        schemaVersion: 1,
        updatedAt: 'Wed Nov 04 2015 12:06:59 GMT+0000 (GMT Standard Time)',
        updatedBy: {
            cn: 'test',
            q: 'some query'
        }
    }


};
