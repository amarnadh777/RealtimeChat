import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

function Message({ message, data }) {
  const { userData } = useContext(UserContext);
const timestamp = "2025-01-28T17:39:41.628+00:00";

const date = new Date(data.createdAt);
const formattedTime = date.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true, 
});
 
  
  const isSender = data.sender === userData._id;
 
  

  return (<>

 
   <div className={`flex ${isSender ? "justify-start" : "justify-end"}`}>
      <div
        className={`px-3 py-2 max-w-xs rounded-lg text-black ${
          isSender ? "bg-green-500" :  "bg-white"
        }`}
      >

        {data.image ?  (  <> <img src={data.image} /> </> ) :       ( message )}
    
        <div className="flex justify-end">
          <p className="text-sm text-gray-600">{formattedTime}</p>
        </div>
      </div>
    </div>
  </>
   
  );
}

export default Message;
