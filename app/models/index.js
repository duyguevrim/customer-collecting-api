require('dotenv').config()
const Sequelize = require("sequelize");

const sequelize = new Sequelize(`${process.env.dialect}://${process.env.dialect}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB}`)

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.customer = require("../models/customer.model.js")(sequelize, Sequelize);


db.role.hasMany(db.user, {as: 'User'});
db.user.belongsTo(db.role, {foreignKey: 'roleId'});



db.ROLES = ["Employee", "Finance", "Admin"];

module.exports = db;