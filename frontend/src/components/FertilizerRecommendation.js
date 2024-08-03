import React, { useState } from 'react';
import axios from 'axios';

const FertilizerRecommendation = ({ setResult }) => {
const [n, setN] = useState('');
const [p, setP] = useState('');
const [k, setK] = useState('');
const [t, setT] = useState('');
const [h, setH] = useState('');
const [soilMoisture, setSoilMoisture] = useState('');
const [soil, setSoil] = useState('');
const [crop, setCrop] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("ama");
      const response = await axios.post('http://localhost:5000/api/fertilizer-recommendation', {
        n,
        p,
        k,
        t,
        h,
        soilMoisture,
        soil,
        crop,
      });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
      setResult('Error fetching recommendation');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nitrogen:
        <input type="number" value={n} onChange={(e) => setN(e.target.value)} required />
      </label>
      <label>
        Phosphorus:
        <input type="number" value={p} onChange={(e) => setP(e.target.value)} required />
      </label>
      <label>
        Potassium:
        <input type="number" value={k} onChange={(e) => setK(e.target.value)} required />
      </label>
      <label>
        Temperature:
        <input type="number" value={t} onChange={(e) => setT(e.target.value)} required />
      </label>
      <label>
        Humidity:
        <input type="number" value={h} onChange={(e) => setH(e.target.value)} required />
      </label>
      <label>
        Soil Moisture:
        <input type="number" value={soilMoisture} onChange={(e) => setSoilMoisture(e.target.value)} required />
      </label>
      <label>
        Soil Type:
        <select value={soil} onChange={(e) => setSoil(e.target.value)} required>
          <option value="">Select Soil Type</option>
          <option value="Sandy">Sandy</option>
          <option value="Loamy">Loamy</option>
          <option value="Black">Black</option>
          <option value="Red">Red</option>
          <option value="Clayey">Clayey</option>
        </select>
      </label>
      <label>
        Crop:
        <select value={crop} onChange={(e) => setCrop(e.target.value)} required>
          <option value="">Select Crop</option>
          <option value="Maize">Maize</option>
          <option value="Sugarcane">Sugarcane</option>
          <option value="Cotton">Cotton</option>
          <option value="Tobacco">Tobacco</option>
          <option value="Paddy">Paddy</option>
          <option value="Barley">Barley</option>
          <option value="Wheat">Wheat</option>
          <option value="Millets">Millets</option>
          <option value="Oil seeds">Oil seeds</option>
          <option value="Pulses">Pulses</option>
          <option value="Ground Nuts">Ground Nuts</option>
        </select>
      </label>
      <button type="submit">Recommend</button>
    </form>
  );
};

export default FertilizerRecommendation;
