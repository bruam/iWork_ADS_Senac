const { Model, DataTypes } = require("sequelize");
const Task = require("./task");

class Project extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        deadline: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

Project.associate = (models) => {
  Project.hasMany(models.Task, {
    foreignKey: "project_id",
  });
};

module.exports = Project;
