import React from 'react'
import { IoMdClose , IoIosSend} from 'react-icons/io'

function PreviewImage({handleRemoveImage,onConfirm}) {
  return (
    <div>
          (
                <div className="fixed bottom-20 w-[40em] bg-white p-4 shadow-xl flex flex-col rounded-md">
                  {/* Close Button */}
                  <div className="flex justify-end">
                    <button onClick={handleRemoveImage} className="p-1 rounded-full hover:bg-gray-200">
                      <IoMdClose className="text-xl text-gray-600 hover:text-black" />
                    </button>
                  </div>
        
                  {/* Image */}
                  {/* <img src={previewImage} className="w-full max-h-64 object-contain rounded-md" alt="Preview" /> */}
        
                  {/* Send Button */}
                  <div className="flex justify-end mt-2">
                    <button   onClick={onConfirm}   className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                      <IoIosSend size={24} />
                    </button>
                  </div>
                </div>
              )



        
    </div>
  )
}

export default PreviewImage