import React, { useState } from 'react';
import axios from 'axios';
import {state_arr, s_a} from '../stateDistrictData';

const CropPredictionForm = ({ setResult }) => {
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [season, setSeason] = useState('');
  const [districts, setDistricts] = useState([]);

  const handleStateChange = (event) => {
    
    const selectedState = event.target.value;
    const selectedIndex = state_arr.indexOf(selectedState);
    setState(selectedState);
    setDistrict(""); // Reset district selection

    if (selectedIndex >= 0) {
      // Get districts for the selected state
      setDistricts(s_a[selectedIndex] ? s_a[selectedIndex].split(" | ") : []);
    } else {
      setDistricts([]);
    }
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/predict', {
        state,
        district,
        season,
      });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setResult('Error fetching prediction');
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <label>
        State:
        <select value={state} onChange={handleStateChange}>
          <option value="">Select State</option>
          {state_arr  ? (
            state_arr.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ),)
          ) : (
            <option value="">No States Available</option>
          )}
        </select>
      </label>
      <label>
      District:
        <select value={district} onChange={handleDistrictChange} disabled={!districts.length}>
          <option value="">Select District</option>
          {districts.map((district, index) => (
            <option key={index} value={district}>
              {district}
            </option>
          ))}
        </select>
      </label>
      <label>
        Season:
        <select value={season} onChange={(e) => setSeason(e.target.value)}>
          <option value="">Select Season</option>
          <option value="Kharif">Kharif</option>
          <option value="Whole Year">Whole Year</option>
          <option value="Autumn">Autumn</option>
          <option value="Rabi">Rabi</option>
          <option value="Summer">Summer</option>
          <option value="Winter">Winter</option>
        </select>
      </label>
      <button type="submit">Predict</button>
    </form>
  );
};

export default CropPredictionForm;


