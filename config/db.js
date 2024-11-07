const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.BASE_DATA_DB,
    process.env.BASE_DATA_ROOT,
    process.env.BASE_DATA_ROOT_PASSWORD,
    {
        host: process.env.BASE_DATA_HOST,
        port: process.env.BASE_DATA_PORT,
        dialect: process.env.BASE_DATA_DIALECT,  // Note: Be careful with case sensitivity here
    }
);

module.exports = sequelize;

