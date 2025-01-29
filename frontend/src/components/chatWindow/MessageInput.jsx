import React from "react";
import { CiFaceSmile } from "react-icons/ci";
import { IoIosSend } from "react-icons/io";

function MessageInput({ onSend, onChange, value }) {
  return (
    <div className="bg-white fixed w-[65%] bottom-0 px-10 py-4">
      <div className="flex items-center space-x-3">
        <button className="text-gray-500 hover:text-gray-700">
          <CiFaceSmile size={24} />
        </button>

        <input
          type="text"
          placeholder="Type a message..."
          className="w-full py-2 px-3 border border-gray-300 rounded-lg outline-none"
          value={value}
          onChange={onChange}
        />

        <button
          onClick={onSend}
          className="text-blue-500 hover:text-blue-700 transition"
        >
          <IoIosSend size={24} />
        </button>
      </div>
    </div>
  );
}

export default MessageInput;