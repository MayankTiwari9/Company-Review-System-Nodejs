const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('company-review-system', 'root', 'Mayank@123', {
    dialect: "mysql",
    host: "localhost"
})

module.exports = sequelize;
