'use strict';

module.exports = {
    up: function(migration, DataTypes) {

        return migration.createTable('probes', {

            channel: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
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
        return migration.dropTable('probes');
    }
};