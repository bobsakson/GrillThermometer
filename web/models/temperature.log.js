'use strict';

module.exports = function(sequelize, DataTypes) {
  var TemperatureLog = sequelize.define('TemperatureLog', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    fahrenheit: DataTypes.INTEGER,
    celsius: DataTypes.INTEGER,
    kelvin: DataTypes.INTEGER,
    probeChannel : DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });

  return TemperatureLog;
};