'use strict';

module.exports = {

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
            recType: {
                type: 'string'
            },
            entity: {
                noteList: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            dt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            text: {
                                type: 'string'
                            },
                            user: {
                                type: 'object',
                                format: 'dbRef',
                                properties: {
                                    cn: {
                                        type: 'string'
                                    },
                                    q: {
                                        type: ['string', 'object']
                                    }
                                },
                                required: ['cn', 'q'],
                                additionalProperties: false
                            },
                            noteType: 'luRef',
                            subject: {
                                type: 'string'
                            }
                        },
                        required: ['dt', 'text', 'user', 'noteType']
                    }
                }
            },
            person: {
                type: 'object',
                properties: {
                    salutation: {
                        type: 'string'
                    },
                    givenName: {
                        type: 'string'
                    },
                    middleName: {
                        type: 'string'
                    },
                    familyName: {
                        type: 'string'
                    },
                    gender: {
                        enum: ['m', 'f']
                    },
                    dateOfBirth: {
                        type: 'string',
                        format: 'date'
                    },
                    placeOfBirth: {
                        type: 'string'
                    },
                    passport: {
                        type: 'object',
                        required: ['number'],
                        properties: {
                            number: {
                                type: 'string'
                            }
                        },
                        additionalProperties: false
                    },
                    homeAddress: {
                        type: 'object',
                        properties: {
                            buildingName: {
                                type: 'string'
                            },
                            buildingNumber: {
                                type: 'string'
                            },
                            locality: {
                                type: 'string'
                            },
                            postCode: {
                                type: 'string'
                            },
                            postTown: {
                                type: 'string'
                            },
                            thoroughfarse: {
                                type: 'string'
                            },
                            unitName: {
                                type: 'string'
                            },
                            county: {
                                type: 'object',
                                // format: 'dbRef',
                                properties: {
                                    cn: {
                                        'type': 'string'
                                    },
                                    q: {
                                        type: [
                                            'string',
                                            'object'
                                        ]
                                    }
                                },
                                required: [
                                    'cn',
                                    'q'
                                ],
                                additionalProperties: false
                            }
                        },
                        additionalProperties: false
                    },
                    phone: {
                        type: 'object',
                        properties: {
                            countryCode: {
                                type: 'string'
                            },
                            areaCode: {
                                type: 'string'
                            },
                            localNumber: {
                                type: 'string'
                            }
                        },
                        required: ['countryCode', 'areaCode', 'localNumber'],
                        additionalProperties: false
                    },
                    mobile: {
                        type: 'object',
                        properties: {
                            countryCode: {
                                type: 'string'
                            },
                            areaCode: {
                                type: 'string'
                            },
                            localNumber: {
                                type: 'string'
                            }
                        },
                        required: ['countryCode', 'areaCode', 'localNumber'],
                        additionalProperties: false
                    },
                    email: {
                        required: ['addr'],
                        type: 'object',
                        properties: {
                            addr: {
                                type: 'string',
                                format: 'email'
                            }
                        },
                        additionalProperties: false
                    },
                    noteList: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                dt: {
                                    type: 'string',
                                    format: 'date-time'
                                },
                                text: {
                                    type: 'string'
                                },
                                user: {
                                    type: 'object',
                                    // format: 'dbRef',
                                    properties: {
                                        cn: {
                                            type: 'string'
                                        },
                                        q: {
                                            type: ['string', 'object']
                                        }
                                    },
                                    required: ['cn', 'q'],
                                    additionalProperties: false
                                },
                                noteType: {
                                    type: 'object',
                                    // format: 'luRef',
                                    properties: {
                                        lt: {
                                            type: 'string'
                                        },
                                        lv: {
                                            type: ['string', 'array']
                                        }
                                    },
                                    required: ['lt', 'lv']
                                },
                                subject: {
                                    type: 'string'
                                }
                            },
                            required: ['dt', 'text', 'user', 'noteType']
                        }
                    }
                },
                additionalProperties: false,
                required: ['salutation', 'givenName', 'familyName', 'dateOfBirth', 'homeAddress', 'phone', 'mobile', 'email']
            },
            control: {
                type: 'object',
                properties: {
                    createdAt: {
                        type: 'string'
                    },
                    createdBy: {
                        type: 'object',
                        // format: 'dbRef',
                        properties: {
                            cn: {
                                type: 'string'
                            },
                            q: {
                                type: ['string', 'object']
                            }
                        },
                        required: ['cn', 'q'],
                        additionalProperties: false
                    },
                    id: {
                        type: 'string'
                    },
                    schemaVersion: {
                        type: 'integer'
                    },
                    updatedAt: {
                        type: 'string'
                    },
                    updatedBy: {
                        type: 'object',
                        // format: 'dbRef',
                        properties: {
                            cn: {
                                type: 'string'
                            },
                            q: {
                                type: ['string', 'object']
                            }
                        },
                        required: ['cn', 'q'],
                        additionalProperties: false
                    }
                }
            }
        },
        required: ['person', 'control', 'recType']
    }

};
