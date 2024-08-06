// Import necessary modules
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import News from './pages/NewsPages/News'; // Make sure the path is correct
import GS from './pages/GovermentScheme/GovernmentScheme'
import WeatherPage from './pages/WeatherPage/WeatherPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/news" element={<News />} />
          <Route path="/GS" element={<GS />} />
          <Route path="/Weather" element={<WeatherPage />} />
          {/* Add other routes here as needed */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
