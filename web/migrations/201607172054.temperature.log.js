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
                type: DataTypes.REAL,
                allowNull: true
            },

            celsius: {
                type: DataTypes.REAL,
                allowNull: true
            },

            kelvin: {
                type: DataTypes.REAL,
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