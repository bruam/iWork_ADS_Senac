const { Model, DataTypes } = require("sequelize");

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        time: DataTypes.INTEGER,
        project_id: DataTypes.INTEGER,
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

module.exports = Task;
