"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("max_scores", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      score: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      projects_done: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    return queryInterface.dropTable("max_scores");
  },
};
