const { Model, DataTypes } = require("sequelize");

class MaxScore extends Model {
  static init(sequelize) {
    super.init(
      {
        score: DataTypes.INTEGER,
        projects_done: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

MaxScore.associate = (models) => {
  MaxScore.belongsTo(models.Users, {
    foreignKey: "user_id",
  });
};

module.exports = MaxScore;
