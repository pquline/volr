require("dotenv").config();
const MONGODB_URI = process.env.MONGO_URI;
//console.log('MongoDB URI:', process.env.MONGO_URI);

const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { table } = require("console");

// Initialize the Express app
const app = express();

// Use CORS middleware
app.use(cors());

// Other middleware (like for parsing JSON, if needed)
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

app.use(express.json());
app.use("/", express.static("./"));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

const linesDb = mongoose.createConnection(`${MONGODB_URI}/lines`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000, // Increase connection timeout
  socketTimeoutMS: 45000, // Increase socket timeout
});
linesDb.on("error", console.error.bind(console, "connection error (linesDb):"));
linesDb.once("open", () => console.log("Connected to 'lines' database"));

const entriesDb = mongoose.createConnection(`${MONGODB_URI}/entries`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000, // Increase connection timeout
  socketTimeoutMS: 45000, // Increase socket timeout
});
entriesDb.on(
  "error",
  console.error.bind(console, "connection error (entriesDb):")
);
entriesDb.once("open", () => console.log("Connected to 'entries' database"));

// Route for fetching data from 'lines' database
app.get("/api/lines", async (req, res) => {
  console.log("Fetching lines");
  const cityFilter = req.query.city;
  const query = cityFilter ? { city: cityFilter } : {};

  try {
    const lines = await Line.find(query).sort({ order: 1 });
    res.json(lines);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/api/lines/name/:lineName", async (req, res) => {
  try {
    const lineName = req.params.lineName;
    const city = req.query.city;

    const query = { name: lineName };
    if (city) {
      query.city = city;
    }

    const line = await Line.findOne(query);
    if (!line) {
      return res.status(404).send("Line not found");
    }
    res.json(line);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/api/entries", async (req, res) => {
  const cityFilter = req.query.city;
  const query = cityFilter ? { city: cityFilter } : {};
  try {
    const entries = await Entry.find(query);
    res.json(entries);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/submit-form", async (req, res) => {
  const formData = req.body;

  try {
    // Check if an entry with the same line, station, location, and direction already exists
    let existingEntry = await Entry.findOne({
      city: formData.city,
      line: formData.line,
      station: formData.station,
      location: formData.location,
      direction: formData.direction,
    });

    if (existingEntry) {
      existingEntry.last_edit = formData.last_edit;
      existingEntry.edits = (existingEntry.edits || 0) + 1;
      if (existingEntry.state !== formData.state) {
        existingEntry.state = formData.state;
      }
      await existingEntry.save();
      res.json({ message: "Existing entry updated", data: existingEntry });
    } else {
      const newEntry = new Entry({
        ...formData,
        edits: 1,
      });
      await newEntry.save();
      res.json({ message: "New entry created", data: newEntry });
    }
  } catch (error) {
    console.error("Error in form submission:", error);
    res.status(500).send(error.message);
  }
});

app.patch("/api/entries/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  console.log("Updated data:", updatedData);

  try {
    // Find the entry to be updated
    const entryToUpdate = await Entry.findById(id);
    let duplicateEdits = 0;

    if (!entryToUpdate) {
      return res.status(404).send("Entry not found");
    }

    // Check if there's another entry with the same characteristics but a different _id
    const duplicateEntry = await Entry.findOne({
      _id: { $ne: id },
      line: updatedData.line,
      station: updatedData.station,
      location: updatedData.location,
      direction: updatedData.direction,
    });

    // If a duplicate is found, delete it
    if (duplicateEntry) {
      duplicateEdits = duplicateEntry.edits;
      await Entry.deleteOne({ _id: duplicateEntry._id });
    }

    // Update the existing entry with the new data
    Object.assign(entryToUpdate, updatedData);
    entryToUpdate.edits = entryToUpdate.edits + duplicateEdits + 1;
    await entryToUpdate.save();

    res.json({ message: "Entry updated", data: entryToUpdate });
  } catch (error) {
    console.error("Error updating entry:", error);
    res.status(500).send(error.message);
  }
});

app.delete("/api/entries/:id", async (req, res) => {
  try {
    const id = req.params.id; // Get the ID from the URL
    await Entry.findByIdAndDelete(id); // Assuming 'Entry' is your Mongoose model
    res.json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Lines
const LinesSchema = new mongoose.Schema({
  city: String,
  order: String,
  name: String,
  type: String,
  stations: [String],
  terminus: [String],
});

const Line = linesDb.model("Line", LinesSchema);

// User entries
const EntrySchema = new mongoose.Schema({
  city: String,
  line: String,
  station: String,
  location: String,
  direction: String,
  state: String,
  edits: { type: Number, default: 0 },
  last_edit: Date,
});

const Entry = entriesDb.model("Entry", EntrySchema);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
