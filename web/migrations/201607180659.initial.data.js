'use strict';

module.exports = {
    up: function(migration, DataTypes) {
        var sql =   "INSERT INTO probes VALUES (0);"
                    + "INSERT INTO probes VALUES (1);"
                    + "INSERT INTO profiles VALUES(DEFAULT, 'Pork Ribs', 'Baby back ribs.', false, current_timestamp, current_timestamp);";

        return  migration.sequelize.query(sql)
                .then(function(dbProfile) {
                    console.log(dbProfile);
                    var probesSQL = "SELECT id FROM profiles WHERE name = 'Pork Ribs';";
                    return  migration.sequelize.query(probesSQL, { type: migration.sequelize.QueryTypes.SELECT })
                            .then(function(dbProfile) {
                                console.log(dbProfile[0]);
                                var probesSQL = "INSERT INTO \"probeProfiles\" VALUES(" + dbProfile[0].id + ", 'Meat', 400, 100, 0, 1, false, current_timestamp, current_timestamp);SELECT setval('\"probeProfiles_id_seq\"', (SELECT MAX(id) FROM \"probeProfiles\"));";
                                return  migration.sequelize.query(probesSQL)
                            });
                });
                    
    },

    down: function(migration, DataTypes) {
        var sql = "DELETE FROM \"probeProfiles\";DELETE FROM profiles;DELETE FROM probes;";

        return  migration.sequelize.query(sql);
    }
};