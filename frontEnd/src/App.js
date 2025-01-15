//import React, { useState, useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';  // Correct imports
import UploadImage from './components/Uploadimage/uploadImage.js'; // Image upload page
import './App.css';

function App() {
  /*
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();  // useNavigate hook for programmatic navigation

  // Check if the user is authenticated when the app starts
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');  // Check local storage for token
    setIsLoggedIn(!!authToken);  // If token exists, user is logged in
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // User logged in successfully
    navigate('/');  // Redirect to home page
  };

  const handleLogout = () => {
    logout(); // Log the user out
    setIsLoggedIn(false); // Update login status
    navigate('/login');  // Redirect to login page after logout
  };
  */
  return (
    <div className="App">
      <h1>React Image Upload App</h1>

      <Routes>
        {/* Direct route to upload image page */}
        <Route path="/upload" element={<UploadImage />} />
        
        {/* Default route to upload image page */}
        <Route path="/" element={<UploadImage />} />
      </Routes>
    </div>
  );
}

export default App;
