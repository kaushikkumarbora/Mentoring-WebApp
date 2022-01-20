const dbConfig = require("./config");
const initModels = require('./models/init-models');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  retry: {
    match: [
      Sequelize.ConnectionRefusedError,
      Sequelize.ConnectionError,
      Sequelize.ConnectionTimedOutError,
      Sequelize.TimeoutError,
      /Deadlock/i],
    max: 3
  }

});

const db = initModels(sequelize);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
