import React from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../appwrite/Auth';
import '../App.css';
import A1 from '../assets/A1.jpg';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await account.deleteSession('current'); // Ends the current session
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <div>
      <div className="header-header">
      <button
            
            onClick={handleLogout}
          >
            Logout
          </button>
        <div className="header-header-tittle fs-4">
        

          <span>Title</span>
        </div>
        <div className="d-flex align-items-center">
          <div className="avatar me-3">
            <img src={A1} alt="avatar" />
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Navbar;
