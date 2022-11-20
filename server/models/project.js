const { Model, DataTypes } = require("sequelize");

class Project extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        deadline: DataTypes.STRING,
        concluded: DataTypes.BOOLEAN,
        user_id: DataTypes.INTEGER,
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

Project.associate = (models) => {
  Project.belongsTo(models.User, {
    foreignKey: "user_id",
  });
};

module.exports = Project;
