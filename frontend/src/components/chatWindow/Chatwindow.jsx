import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { UserContext } from "../../context/UserContext";
import { getMessages, sendMessage } from "../../api/userApis";
import axios from "axios";

function ChatWindow() {
  const { selectedUserData, userData, socket } = useContext(UserContext);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const fetchMessages = useCallback(async () => {
    if (!selectedUserData) return;
    setLoading(true);
    try {
      const response = await getMessages({
        senderId: userData._id,
        receiverId: selectedUserData._id,
      });
      setMessages(response);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedUserData, userData._id]);

  useEffect(() => {
    if (!selectedUserData || !socket) return;

    fetchMessages();
    socket.emit("register", userData._id);

    const handleReceiveMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    const handleTyping = (data) => {
      if (data.sender === selectedUserData._id) {
        setTyping(true);
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => setTyping(false), 2000);
      }
    };

    const handleOnlineUsers = (users) => {
      setOnlineUsers(users);
    };

    socket.on("receive", handleReceiveMessage);
    socket.on("typing", handleTyping);
    socket.on("onlineUsers", handleOnlineUsers);

    return () => {
      socket.off("receive", handleReceiveMessage);
      socket.off("typing", handleTyping);
      socket.off("onlineUsers", handleOnlineUsers);
    };
  }, [selectedUserData, socket, fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChange = (e) => {
    setText(e.target.value);
    socket.emit("typing", {
      sender: userData._id,
      receiver: selectedUserData._id,
    });
  };

  const onSend = async () => {
    if (!text.trim() && !image) return;

    const formData = new FormData();
    formData.append("message", text);
    if (image) formData.append("image", image);
    formData.append("sender", userData._id);
    formData.append("receiver", selectedUserData._id);

    const newMessage = {
      sender: userData._id,
      receiver: selectedUserData._id,
      message: text,
      image: previewImage,
      createdAt: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    socket.emit("send", newMessage);

    try {
      await axios.post("http://localhost:3000/message/send", formData);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setText("");
    setImage(null);
    setPreviewImage(null);
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewImage(null);
  };

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
      {/* Header */}
      <div className="w-full flex bg-white py-2 px-10 sm:px-2">
        <div className="flex items-center">
          <img src={selectedUserData?.profileImg} alt="Profile" className="size-10 rounded-full mx-5" />
          <div>
            <p className="font-bold">{selectedUserData?.fullName || "User"}</p>
            <p className={onlineUsers.includes(selectedUserData._id) ? "text-green-600 font-bold" : "text-gray-600"}>
              {onlineUsers.includes(selectedUserData._id) ? "Online" : "Offline"}
            </p>
            {typing && <p className="text-green-600">Typing...</p>}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-4 p-10 max-h-[80vh] overflow-y-scroll">
        {messages.map((each, index) => <Message key={index} data={each} message={each.message} />)}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSend={onSend} onChange={handleChange} value={text} onFileChange={onFileChange} previewImage={previewImage} onRemoveImage={handleRemoveImage} />
    </div>
  );
}

export default ChatWindow;
