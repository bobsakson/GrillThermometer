'use strict';

module.exports = {
    up: function(migration, DataTypes) {

        return migration.createTable('probeProfiles', {

            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            label: {
                type: DataTypes.STRING,
                allowNull: false
            },

            upperThreshold: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            lowerThreshold: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            probeChannel: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'probes',
                    key: 'channel'
                }
            },

            profileId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'profiles',
                    key: 'id'
                }
            },

            isDeleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },

            createdAt: {
                type: DataTypes.DATE
            },

            updatedAt: {
                type: DataTypes.DATE
            }
        });

    },

    down: function(migration, DataTypes) {
        return migration.dropTable('probeProfiles');
    }
};