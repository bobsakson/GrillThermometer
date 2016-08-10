'use strict';

module.exports = function(sequelize, DataTypes) {
  var ProbeProfile = sequelize.define('ProbeProfile', {
    id: { type: DataTypes.INTEGER, primaryKey: true},
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
        // TODO: Add the relationship and subsequent code to get the channel relationship working.
        // ProbeProfile.belongsTo(models.Probe, { foreignKey: 'channel' });
      }
    }
  });

  return ProbeProfile;
};