var DataTypes = require("sequelize").DataTypes;
var _chat = require("./chat");
var _chat_period = require("./chat_period");
var _department = require("./department");
var _mentee = require("./mentee");
var _mentor = require("./mentor");
var _message = require("./message");
var _recuse = require("./recuse");
var _register = require("./register");
var _today_messages = require("./today_messages");

function initModels(sequelize) {
  var chat = _chat(sequelize, DataTypes);
  var chat_period = _chat_period(sequelize, DataTypes);
  var department = _department(sequelize, DataTypes);
  var mentee = _mentee(sequelize, DataTypes);
  var mentor = _mentor(sequelize, DataTypes);
  var message = _message(sequelize, DataTypes);
  var recuse = _recuse(sequelize, DataTypes);
  var register = _register(sequelize, DataTypes);
  var today_messages = _today_messages(sequelize, DataTypes);

  chat_period.belongsTo(chat, { as: "id_chat", foreignKey: "id"});
  chat.hasMany(chat_period, { as: "chat_periods", foreignKey: "id"});
  message.belongsTo(chat, { as: "chat", foreignKey: "chat_id"});
  chat.hasMany(message, { as: "messages", foreignKey: "chat_id"});
  mentor.belongsTo(department, { as: "dept", foreignKey: "dept_id"});
  department.hasMany(mentor, { as: "mentors", foreignKey: "dept_id"});
  chat.belongsTo(mentee, { as: "mentee", foreignKey: "mentee_id"});
  mentee.hasMany(chat, { as: "chats", foreignKey: "mentee_id"});
  chat.belongsTo(mentor, { as: "mentor", foreignKey: "mentor_id"});
  mentor.hasMany(chat, { as: "chats", foreignKey: "mentor_id"});
  recuse.belongsTo(mentor, { as: "mentor", foreignKey: "mentor_id"});
  mentor.hasMany(recuse, { as: "recuses", foreignKey: "mentor_id"});
  register.belongsTo(mentor, { as: "mentor", foreignKey: "mentor_id"});
  mentor.hasMany(register, { as: "registers", foreignKey: "mentor_id"});

  return {
    chat,
    chat_period,
    department,
    mentee,
    mentor,
    message,
    recuse,
    register,
    today_messages,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
