const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Blog = sequelize.define(
  'Blog',
  {
    title: 
    { type: DataTypes.STRING(255), 
      allowNull: false,
      get() {
        return this.getDataValue('title').toUpperCase(); // getter
      }
    },
    status: { type: DataTypes.BOOLEAN, defaultValue: 0},
    approve: {
      type: DataTypes.VIRTUAL, // virtual attributes
      get() {
        //custom logic
        return this.status ? 'Active' : 'Inactive';
      }
    },

    published_at: {
      type: DataTypes.VIRTUAL, // virtual attributes
      get() {
        //custom logic
        return `${this.created_at.getDate()}/${this.created_at.getMonth()+1}/${this.created_at.getFullYear()+543}`;
      }
    },

    user_id: { type: DataTypes.INTEGER },
    // created_at: {type: DataTypes.DATE}
  },
  {
    // Other model options go here
    // underscored: true, // Converts all camelCased columns to underscored
    timestamps: true, // ต้องการเปิดใช้ feature timestamps
    createdAt: 'created_at', // created_at คือคอลัมน์จริงๆใน table
    updatedAt: 'updated_at', // updated_at คือคอลัมน์จริงๆใน table
    tableName: 'blogs',
  },
);

module.exports = Blog;
