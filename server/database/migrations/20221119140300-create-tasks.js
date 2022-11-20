"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("tasks", {
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
      time: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "projects",
            schema: "public",
          },
          key: "id",
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "users",
            schema: "public",
          },
          key: "id",
        },
      },
      minutes_left: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      seconds_left: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    return queryInterface.dropTable("tasks");
  },
};
