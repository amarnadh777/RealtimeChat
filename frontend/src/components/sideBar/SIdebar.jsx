import React, { useContext, useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import People from "./People";
import { getUserList } from "../../api/userApis";
import ProfileSidebar from "../profileSidebar/ProfileSidebar";
import { UserContext } from "../../context/UserContext";
import { GiHamburgerMenu } from "react-icons/gi";


function SIdebar() {
  
  const [userList, setUserList] = useState([]);
  const {userData} = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const get = async () => {
     
      try {
        const response = await getUserList(userData?._id);
     
        setUserList(response);
      } catch (error) {}
    };
    get();
  }, []);
  return (
<>

<button
        className="md:hidden fixed bg-gray-900 text-white p-2 rounded-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <GiHamburgerMenu size={24} />
      </button>
    <div className={`fixed h-screen bg-white min-h-screen  ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } ease-out  md:relative md:translate-x-0 md:w-80`}>
      {console.log(isOpen)}
      
      <div className="flex space-x-1 items-center pl-2">
        <ProfileSidebar />
        <Searchbar />
        
       
      </div>
      <div>
     
      </div>
      <div
        className=" flex flex-col space-y-2 overflow-y-auto  max-h-[80vh]     [&::-webkit-scrollbar]:w-2   
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500  "
        >
        {userList.map((each) => {
          return <People userData={each} />;
        })}
      </div>
    </div>
        </>
  
  );
}

export default SIdebar;
