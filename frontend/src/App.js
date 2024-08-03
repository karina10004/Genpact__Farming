// Import necessary modules
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import News from './pages/News'; // Make sure the path is correct

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/news" element={<News />} />
          {/* Add other routes here as needed */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
