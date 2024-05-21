const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Company = sequelize.define('company', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pros: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cons: {
        type: Sequelize.STRING
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Company;