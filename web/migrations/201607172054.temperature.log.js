'use strict';

module.exports = {
    up: function(migration, DataTypes) {

        return migration.createTable('temperatureLog', {

            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            fahrenheit: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            celsius: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            kelvin: {
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

            readingDateTime: {
                type: DataTypes.DATE
            }
        });

    },

    down: function(migration, DataTypes) {
        return migration.dropTable('temperatureLog');
    }
};