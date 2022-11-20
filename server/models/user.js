const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

User.associate = (models) => {
  User.hasMany(models.Project, {
    foreignKey: "user_id",
  });
};

User.associate = (models) => {
  User.hasMany(models.Task, {
    foreignKey: "user_id",
  });
};

User.associate = (models) => {
  User.hasMany(models.MaxScore, {
    foreignKey: "user_id",
  });
};

User.associate = (models) => {
  User.hasMany(models.Trophy, {
    foreignKey: "user_id",
  });
};

module.exports = User;
