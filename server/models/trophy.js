const { Model, DataTypes } = require("sequelize");

class Trophy extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        goal: DataTypes.INTEGER,
        trophy_type: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Trophy;
