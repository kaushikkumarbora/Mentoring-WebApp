var DataTypes = require("sequelize").DataTypes;
var _chat_mapping = require("./chat_mapping");
var _department = require("./department");
var _event = require("./event");
var _feedback = require("./feedback");
var _guardian = require("./guardian");
var _mentee = require("./mentee");
var _mentor = require("./mentor");
var _mentor_mentee = require("./mentor_mentee");
var _mentor_register_info = require("./mentor_register_info");
var _message = require("./message");
var _report = require("./report");
var _today_messages = require("./today_messages");

function initModels(sequelize) {
  var department = _department(sequelize, DataTypes);
  var mentee = _mentee(sequelize, DataTypes);
  var mentor = _mentor(sequelize, DataTypes);
  var guardian = _guardian(sequelize, DataTypes);
  var mentor_mentee = _mentor_mentee(sequelize, DataTypes);
  var chat_mapping = _chat_mapping(sequelize, DataTypes);
  var event = _event(sequelize, DataTypes);
  var feedback = _feedback(sequelize, DataTypes);  
  var mentor_register_info = _mentor_register_info(sequelize, DataTypes);
  var message = _message(sequelize, DataTypes);
  var report = _report(sequelize, DataTypes);
  var today_messages = _today_messages(sequelize, DataTypes);

  chat_mapping.belongsToMany(chat_mapping, { as: 'date_chat_mappings', through: message, foreignKey: "chat_id", otherKey: "date" });
  chat_mapping.belongsToMany(chat_mapping, { as: 'chat_id_chat_mappings', through: message, foreignKey: "date", otherKey: "chat_id" });
  message.belongsTo(chat_mapping, { as: "chat", foreignKey: "chat_id"});
  chat_mapping.hasMany(message, { as: "messages", foreignKey: "chat_id"});
  message.belongsTo(chat_mapping, { as: "date_chat_mapping", foreignKey: "date"});
  chat_mapping.hasMany(message, { as: "date_messages", foreignKey: "date"});
  mentor.belongsTo(department, { as: "dept", foreignKey: "dept_id"});
  department.hasMany(mentor, { as: "mentors", foreignKey: "dept_id"});
  chat_mapping.belongsTo(mentee, { as: "mentee", foreignKey: "mentee_id"});
  mentee.hasMany(chat_mapping, { as: "chat_mappings", foreignKey: "mentee_id"});
  event.belongsTo(mentee, { as: "mentee", foreignKey: "mentee_id"});
  mentee.hasMany(event, { as: "events", foreignKey: "mentee_id"});
  feedback.belongsTo(mentee, { as: "mentee", foreignKey: "mentee_id"});
  mentee.hasMany(feedback, { as: "feedbacks", foreignKey: "mentee_id"});
  guardian.belongsTo(mentee, { as: "mentee", foreignKey: "mentee_id"});
  mentee.hasMany(guardian, { as: "guardians", foreignKey: "mentee_id"});
  mentor_mentee.belongsTo(mentee, { as: "mentee", foreignKey: "mentee_id"});
  mentee.hasMany(mentor_mentee, { as: "mentor_mentees", foreignKey: "mentee_id"});
  report.belongsTo(mentee, { as: "mentee", foreignKey: "mentee_id"});
  mentee.hasMany(report, { as: "reports", foreignKey: "mentee_id"});
  chat_mapping.belongsTo(mentor, { as: "mentor", foreignKey: "mentor_id"});
  mentor.hasMany(chat_mapping, { as: "chat_mappings", foreignKey: "mentor_id"});
  event.belongsTo(mentor, { as: "mentor", foreignKey: "mentor_id"});
  mentor.hasMany(event, { as: "events", foreignKey: "mentor_id"});
  feedback.belongsTo(mentor, { as: "mentor", foreignKey: "mentor_id"});
  mentor.hasMany(feedback, { as: "feedbacks", foreignKey: "mentor_id"});
  mentor_mentee.belongsTo(mentor, { as: "mentor", foreignKey: "mentor_id"});
  mentor.hasMany(mentor_mentee, { as: "mentor_mentees", foreignKey: "mentor_id"});
  report.belongsTo(mentor, { as: "mentor", foreignKey: "mentor_id"});
  mentor.hasMany(report, { as: "reports", foreignKey: "mentor_id"});
  mentor_mentee.belongsTo(mentor_mentee, { as: "id_mentor_mentee", foreignKey: "id"});
  mentor_mentee.hasOne(mentor_mentee, { as: "mentor_mentee", foreignKey: "id"});

  return {
    chat_mapping,
    department,
    event,
    feedback,
    guardian,
    mentee,
    mentor,
    mentor_mentee,
    mentor_register_info,
    message,
    report,
    today_messages,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
