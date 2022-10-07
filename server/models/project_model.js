module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("project", {
    title: {
      type: Sequelize.STRING
    },
    deadline: {
      type: Sequelize.DATE
    }
  });

  return Project;
};