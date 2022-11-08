"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("trophies", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      goal: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      trophy_type: {
        type: Sequelize.STRING,
        defaultValue: "T",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("trophies");
  },
};
