import React, { useContext, useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import People from "./People";
import { getUserList } from "../../api/userApis";
import ProfileSidebar from "../profileSidebar/ProfileSidebar";
import { UserContext } from "../../context/UserContext";

function SIdebar() {
  
  const [userList, setUserList] = useState([]);
  const {userData} = useContext(UserContext)
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
    <div className="bg-white min-h-screen">
      <div className="flex space-x-1 items-center pl-2">
        <ProfileSidebar />
        <Searchbar />
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
  );
}

export default SIdebar;
