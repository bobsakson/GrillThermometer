'use strict';

module.exports = function(sequelize, DataTypes) {
  var Probe = sequelize.define('Probe', {
    channel: { type: DataTypes.INTEGER, primaryKey: true},
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE          
  }, {
    classMethods: {
      associate: function(models) {
        // Probe.hasMany(models.ProbeProfile, { as: 'ProbeProfiles'});
        Probe.hasMany(models.TemperatureLog);
      }
    }
  });

  return Probe;
};