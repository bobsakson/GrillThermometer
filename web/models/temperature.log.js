'use strict';

module.exports = function(sequelize, DataTypes) {
  var TemperatureLog = sequelize.define('TemperatureLog', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    fahrenheit: DataTypes.INTEGER,
    celsius: DataTypes.INTEGER,
    kelvin: DataTypes.INTEGER,
    probeChannel : DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN,
    readingDateTime: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        TemperatureLog.belongsTo(models.Probe);
      }
    }
  });

  return TemperatureLog;
};