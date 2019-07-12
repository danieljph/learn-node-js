const SimpleModel = require('../utils/simple-model');

class Person extends SimpleModel
{
    hello()
    {
        console.log("HELLO");
    }

    static get tableName()
    {
        return "person";
    }

    static get idColumn()
    {
        return "id";
    }

    static get jsonSchema()
    {
        return {
            type: 'object',
            required: ['name'],
            properties: {
                /**
                 * Type List : object, array, string, number, boolean, or null.
                 */
                id: {type: 'number'},
                name: {type: 'string', minLength: 1, maxLength: 100},
                address: {type: 'string', minLength: 1, maxLength: 500}
            }
        }
    }
}

module.exports = Person;
