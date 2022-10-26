const { Model, DataTypes } = require("sequelize");

class MaxScore extends Model {
  static init(sequelize) {
    super.init(
      {
        score: DataTypes.INTEGER,
        projects_done: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = MaxScore;
