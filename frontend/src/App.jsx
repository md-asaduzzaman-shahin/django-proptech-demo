import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The Landing Page (Home) */}
        <Route path="/" element={<LandingPage />} />
        
        {/* The Login Page (The missing link!) */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* The Dashboard (Protected) */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;