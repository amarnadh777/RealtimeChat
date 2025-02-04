import React, { useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { FaPaperclip } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

function MessageInput({ onSend, onChange, value, onFileChange, previewImage, onRemoveImage }) {
  const fileInput = useRef(null);

  const handleFileClick = () => {
    fileInput.current.click();
  };

  return (
    <>
      {/* Image Preview */}
      {previewImage && (
        <div className="fixed bottom-20 w-[40em] bg-white p-4 shadow-xl flex flex-col">
          <div className="flex justify-end">
            <button onClick={onRemoveImage}>
              <IoMdClose className="text-xl text-gray-600 hover:text-black" />
            </button>
          </div>
          <img src={previewImage} className="w-full max-h-50 object-contain" alt="Preview" />

          <div className="flex justify-end mt-2">
            <button onClick={onSend} className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
              <IoIosSend size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="bg-white fixed w-[65%] bottom-0 px-10 py-4">
        <div className="flex items-center space-x-3">
          {/* File Upload */}
          <button onClick={handleFileClick}>
            <FaPaperclip size={20} className="text-gray-500 hover:text-gray-900" />
          </button>
          <input type="file" className="hidden" ref={fileInput} onChange={onFileChange} />

          {/* Text Input */}
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full py-2 px-3 border border-gray-300 rounded-lg outline-none"
            value={value}
            onChange={onChange}
          />

          {/* Send Button */}
          <button onClick={onSend} className="text-blue-500 hover:text-blue-700 transition">
            <IoIosSend size={24} />
          </button>
        </div>
      </div>
    </>
  );
}

export default MessageInput;
