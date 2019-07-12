const knex = require('knex');
const yaml = require('../utils/yaml');

module.exports = knex({
    client: 'mysql2',
    useNullAsDefault: true,
    connection: {
        host: yaml.db.connection.host,
        port: yaml.db.connection.port,
        user: yaml.db.connection.user,
        password: yaml.db.connection.password,
        database: yaml.db.connection.database
    },
    pool: {
        min: yaml.db.pool.min,
        max: yaml.db.pool.max
    }
});
