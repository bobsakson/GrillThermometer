'use strict';

module.exports = {
    up: function(migration, DataTypes) {

        return migration.createTable('profiles', {

            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false
            },

            description: {
                type: DataTypes.TEXT,
                allowNull: true
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
        return migration.dropTable('profiles');
    }
};