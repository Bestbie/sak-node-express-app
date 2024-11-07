const { DataType, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Blog = require('./blog');

const User = sequelize.define(
'User',
    {

        fullname: { type: DataTypes.STRING(255), allowNull: false },
        email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
        password: { type: DataTypes.TEXT, allowNull: false },
        permission: { type: DataTypes.STRING(50), defaultValue: 'member' }
    },
    {
       tableName:'users',
       underscored: true,
       timestamps:false
    },
);

User.hasMany(Blog, {
    foreignKey: 'user_id', // fk ของ table blogs
    sourceKey: 'id', // pk ของ table users
    as: 'blogs',
});

Blog.belongsTo(User, {
    foreignKey: 'user_id', // fk ของ table blogs
    sourceKey: 'id', // pk ของ table users
    as: 'user',
});

module.exports = User;