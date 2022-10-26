const { Model, DataTypes } = require("sequelize");

class Project extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        deadline: DataTypes.STRING,
        concluded: DataTypes.BOOLEAN,
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
