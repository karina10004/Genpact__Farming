const express = require("express");
const connectDB = require("./db/connect");
const dotenv = require("dotenv");
const path = require('path');
const { exec } = require('child_process');
const cors = require('cors');
const app = express();

dotenv.config();

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Prediction route
app.post('/api/predict', (req, res) => {
  const { state, district, season } = req.body;

  if (!state || !district || !season) {
    return res.status(400).json({ error: 'State, district, and season are required' });
  }

  try {
    const jsonState = JSON.stringify(state);
    const jsonDistrict = JSON.stringify(district);
    const jsonSeason = JSON.stringify(season);
    console.log(jsonDistrict,jsonSeason,jsonState);
    const scriptPath = path.join(__dirname, 'ML/crop_prediction/ZDecision_Tree_Model_Call.py');
    const command = `python ${scriptPath} ${jsonState} ${jsonDistrict} ${jsonSeason}`;
    console.log("pandu pada");
    console.log(command);
    exec(command, (error, stdout, stderr) => {
      console.log("mcbcbbb");
      if (error) {
        console.error('Error executing Python script:', error);
        console.log("mcbec");
        return res.status(500).json({ error: 'Error performing prediction' });
      }

      if (stderr) {
        console.error('Python script stderr:', stderr);
        console.log("mcbc");
        return res.status(500).json({ error: 'Error performing prediction' });
      }
      console.log("hello");
      return res.json({ result: stdout });
    });
  } catch (error) {
    console.error('Error performing prediction:', error);
    res.status(500).json({ error: 'Error performing prediction' });
  }
});

// Prediction route for fertilizers
app.post('/api/fertilizer-recommendation', (req, res) => {
  const { n, p, k, t, h, soilMoisture, soil, crop } = req.body;

  console.log("ama");
  if (!n || !p || !k || !t || !h || !soilMoisture || !soil || !crop) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const scriptPath = path.join(__dirname, 'ML/fertilizer_recommendation/fertilizer_recommendation.py');
    const command = `python ${scriptPath} ${n} ${p} ${k} ${t} ${h} ${soilMoisture} ${soil} ${crop}`;
    console.log("Executing command:", command);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Error executing Python script:', error);
        return res.status(500).json({ error: 'Error performing prediction' });
      }

      if (stderr) {
        console.error('Python script stderr:', stderr);
        return res.status(500).json({ error: 'Error performing prediction' });
      }

      console.log('Python script output:', stdout);
      return res.json({ result: stdout.trim() }); // .trim() to remove any extra new lines
    });
  } catch (error) {
    console.error('Error performing prediction:', error);
    res.status(500).json({ error: 'Error performing prediction' });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
