db = db.getSiblingDB('lines');

load("/data/lines.json");

try {
    db.lines.insertMany(JSON.parse(fileData));
    print('Successfully loaded lines data');
} catch (err) {
    print('Error loading data:', err);
}
