"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("projects", {
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
      deadline: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      concluded: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable("project");
  },
};
