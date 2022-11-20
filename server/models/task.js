const { Model, DataTypes } = require("sequelize");

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        time: DataTypes.INTEGER,
        project_id: DataTypes.INTEGER,
        minutes_left: DataTypes.INTEGER,
        seconds_left: DataTypes.INTEGER,
        concluded: DataTypes.BOOLEAN,
        user_id: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

Task.associate = (models) => {
  Task.belongsTo(models.Projects, {
    foreignKey: "project_id",
  });
};

Task.associate = (models) => {
  Task.belongsTo(models.User, {
    foreignKey: "user_id",
  });
};

module.exports = Task;
