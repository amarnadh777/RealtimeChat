import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { FaArrowLeft } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
import { getMessages, sendMessage } from "../../api/userApis";

function Chatwindow() {
  const { selectedUserData, userData, socket } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUserData || !socket) return;

    const fetchMessages = async () => {
      const response = await getMessages({
        senderId: userData._id,
        receiverId: selectedUserData._id,
      });

      setMessages(response);
    };

    fetchMessages();

    // Listen for incoming messages
    socket.on("receive", (data) => {
    
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receive"); // Cleanup listener when component unmounts
    };
  }, [selectedUserData, socket]);

  // Auto-scroll when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send a message
  const onSend = async () => {
    if (!text.trim()) return;

    try {

      setMessages((prevMessages) => [...prevMessages, {
        senderId: userData._id,
        receiverId: selectedUserData._id,
        message: text,
        createdAt:"2025-01-31T06:25:13.243Z"
      }]);
      const response = await sendMessage({
        senderId: userData._id,
        receiverId: selectedUserData._id,
        message: text,
      });

      socket.emit("send",response);
     
      setText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Show placeholder message when no user is selected
  if (!selectedUserData) {
    return (
      <div className="bg-blue-300 min-h-screen w-full flex items-center justify-center">
        <h2 className="text-black font-semibold text-xl">
          Please select a user for chatting...
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-blue-300 min-h-screen w-full">
      <div className="w-full flex bg-white py-2 px-2">
        <div className="flex items-center">
          <div className="block md:hidden">
            <FaArrowLeft className="text-black hover:text-gray-400" />
          </div>
          <div className="size-10 bg-black rounded-full mx-5"></div>
          <div>
            <p className="font-bold">{selectedUserData?.fullName || "User"}</p>
            <p className="text-gray-300">Last Seen 5 min ago</p>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div
        className="flex flex-col gap-4 p-10 max-h-[80vh] overflow-y-scroll
        [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        {messages.map((each, index) => (
          <div key={index}>
            <Message data={each} message={each.message} />
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center justify-center">
        <MessageInput onSend={onSend} onChange={(e) => setText(e.target.value)} value={text} />
      </div>
    </div>
  );
}

export default Chatwindow;
