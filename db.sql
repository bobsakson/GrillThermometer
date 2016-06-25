PRAGMA foreign_keys = ON;
CREATE TABLE probes(channel INTEGER PRIMARY KEY, label TEXT);
CREATE TABLE temperaturelog(channel INTEGER REFERENCES probes(channel), fahrenheit REAL, celsius REAL, kelvin REAL, readingDateTime DEFAULT CURRENT_TIMESTAMP);

-- Below is test data.
INSERT INTO probes VALUES (0, 'Food');
INSERT INTO probes VALUES (1, 'Grill');