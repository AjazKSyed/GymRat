"use strict";
module.exports = (sequelize, DataTypes) => {
  const type_of_status = sequelize.define("type_of_status", {
    name: DataTypes.STRING
  });


  return type_of_status;
};
