import React, { useContext, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons for hamburger and close buttons
import { GiHamburgerMenu } from "react-icons/gi";
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

function ProfileSidebar() {
  const {userData,logout}  = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };
 const navigate = useNavigate()
  return (
    <div>
      {/* Hamburger Button to toggle sidebar */}
      <button
        className="px-4 py-2 text-white rounded-md " // Only show on mobile
        onClick={toggleSidebar}
      > 
             <GiHamburgerMenu className='size-6 text-gray-600 hover:text-black'/>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white p-4 transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button inside Sidebar */}
        <button
          className="absolute top-4 right-4 text-white"
          onClick={closeSidebar}
        >
          <FaTimes /> {/* Close icon */}
        </button>

        {/* Profile Content */}
        <div className="flex flex-col space-y-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS-bz3w3YbiCPW23zQNWR0sjH7WNZFmCV_6Q&s"
            className="w-20 h-20 rounded-full"
            alt="Profile"
          />
          <p className="font-bold">{userData?.fullName}</p>
        </div>
        <ul className="mt-4">
          <li>Edit profile</li>
          <li onClick={() =>{
                navigate("/")
            logout()
        
            
          }} >Logout</li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileSidebar;
