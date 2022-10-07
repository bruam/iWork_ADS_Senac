module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    title: {
      type: Sequelize.STRING
    },
    time: {
      type: Sequelize.INTEGER
    }
  });

  return Task;
};