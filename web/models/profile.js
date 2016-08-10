'use strict';

module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define('Profile', {
    id: { type: DataTypes.INTEGER, primaryKey: true},
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    isDeleted: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE          
  }, {
    tableName: 'profiles',
    classMethods: {
      associate: function(models) {
        Profile.hasMany(models.ProbeProfile, { as: 'ProbeProfiles', foreignKey: 'profileId' });
      }
    }
  });

  return Profile;
};