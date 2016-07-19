'use strict';

module.exports = {
    up: function(migration, DataTypes) {
        var sql =   "INSERT INTO probes VALUES (0);"
                    + "INSERT INTO probes VALUES (1);"
                    + "INSERT INTO profiles VALUES(1, 'Pork Ribs', 'Baby back ribs.', false);";

        return  migration.sequelize.query(sql)
                .then(function() {
                    var probesSQL = "INSERT INTO \"probeProfiles\" VALUES(1, 'Meat', 400, 100, 0, 1, false);";
                    return  migration.sequelize.query(probesSQL)
                });
                    
    },

    down: function(migration, DataTypes) {
        var sql = "DELETE FROM \"probeProfiles\";DELETE FROM profiles;DELETE FROM probes;";

        return  migration.sequelize.query(sql);
    }
};