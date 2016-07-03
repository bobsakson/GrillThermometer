PRAGMA foreign_keys = ON;
CREATE TABLE probes(channel INTEGER PRIMARY KEY, label TEXT);
CREATE TABLE temperaturelog(channel INTEGER REFERENCES probes(channel), fahrenheit REAL, celsius REAL, kelvin REAL, readingDateTime DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE profile(id INTEGER PRIMARY KEY, name TEXT, description TEXT, isDeleted BOOLEAN);
CREATE TABLE probeProfile(id INTEGER PRIMARY KEY, channel INTEGER REFERENCES probes(channel), profileId INTEGER REFERENCES profile(id), label TEXT, upperThreshold INTEGER, lowerThreshold INTEGER, isDeleted BOOLEAN);

-- Below is test data.
INSERT INTO probes VALUES (0, 'Food');
INSERT INTO probes VALUES (1, 'Grill');
INSERT INTO profile VALUES('Pork Ribs', 'Baby back ribs.', 0);