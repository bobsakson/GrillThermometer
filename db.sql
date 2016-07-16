CREATE TABLE probes(channel SERIAL PRIMARY KEY, label TEXT);
CREATE TABLE temperature_log(id SERIAL PRIMARY KEY, channel INTEGER REFERENCES probes(channel), fahrenheit REAL, celsius REAL, kelvin REAL, readingDateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE profiles(id SERIAL PRIMARY KEY, name TEXT, description TEXT, isDeleted BOOLEAN);
CREATE TABLE probe_profiles(id SERIAL PRIMARY KEY, channel INTEGER REFERENCES probes(channel), profileId INTEGER REFERENCES profiles(id), label TEXT, upperThreshold INTEGER, lowerThreshold INTEGER, isDeleted BOOLEAN);

-- Below is test data.
INSERT INTO probes VALUES (0, 'Food');
INSERT INTO probes VALUES (1, 'Grill');
INSERT INTO profiles VALUES(1, 'Pork Ribs', 'Baby back ribs.', false);
INSERT INTO probe_profiles VALUES(1, 0, 1, 'Meat', 400, 100, false);