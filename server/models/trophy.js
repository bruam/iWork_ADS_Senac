const { Model, DataTypes } = require("sequelize");

class Trophy extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        goal: DataTypes.INTEGER,
        trophy_type: DataTypes.STRING,
        concluded: DataTypes.BOOLEAN,
        user_id: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

Trophy.associate = (models) => {
  Trophy.belongsTo(models.Users, {
    foreignKey: "user_id",
  });
};

module.exports = Trophy;
