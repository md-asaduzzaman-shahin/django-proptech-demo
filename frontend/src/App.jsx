import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      {/* Routes acts like a Switch Statement for URLs */}
      <Routes>
        {/* If path is exactly "/" -> Show LandingPage */}
        <Route path="/" element={<LandingPage />} />
        
        {/* If path is "/dashboard" -> Show Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;