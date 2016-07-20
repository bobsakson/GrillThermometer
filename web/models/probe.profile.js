'use strict';

module.exports = function(sequelize, DataTypes) {
  var ProbeProfile = sequelize.define('ProbeProfile', {
    id: { type: DataTypes.INTEGER, primaryKey: true},
    label: DataTypes.STRING,
    upperThreshold: DataTypes.INTEGER,
    lowerThreshold: DataTypes.INTEGER,
    probeChannel: DataTypes.INTEGER,
    profileId : DataTypes.INTEGER,
    readingDateTime: DataTypes.DATE
  });

  return ProbeProfile;
};