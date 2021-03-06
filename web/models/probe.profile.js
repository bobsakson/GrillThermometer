'use strict';

module.exports = function(sequelize, DataTypes) {
  var ProbeProfile = sequelize.define('ProbeProfile', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    label: DataTypes.STRING,
    upperThreshold: DataTypes.INTEGER,
    lowerThreshold: DataTypes.INTEGER,
    probeChannel: DataTypes.INTEGER,
    profileId: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE       
  }, {
    tableName: 'probeProfiles',
    classMethods: {
      associate: function(models) {
        ProbeProfile.belongsTo(models.Profile, { foreignKey: 'profileId' });
        ProbeProfile.belongsTo(models.Probe, { foreignKey: 'probeChannel' });
      }
    }
  });

  return ProbeProfile;
};