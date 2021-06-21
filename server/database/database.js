const dbConfig = require("./config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Mentee = require("./models/")(sequelize, Sequelize);
db.Mentor = require("./models/mentor.model")(sequelize, Sequelize);
db.Department = require("./models/department.model")(sequelize, Sequelize);
db.Register = require("./models/register.model")(sequelize, Sequelize);
db.Recuse = require("./models/recuse.model")(sequelize, Sequelize);
db.Chat = require("./models/chat.model")(sequelize, Sequelize);
db.Message = require("./models/message.model")(sequelize, Sequelize);

module.exports = db;
