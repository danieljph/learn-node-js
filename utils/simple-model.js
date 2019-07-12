const { Model } = require('objection');
const knex = require('../utils/knex');
const LOGGER = require('../utils/logger')

Model.knex(knex);

console.log(Model+"");

class SimpleModel extends Model
{
    async findAll()
    {
        LOGGER.debug(`${this.tableName}.findAll...`);
        return SimpleModel.query();
    }
}

module.exports = SimpleModel;
