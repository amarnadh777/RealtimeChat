import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'

function People({isOnline,userData}) {

   const {selectedUser} = useContext(UserContext)
  return (
    <div className=' flex space-x-2 items-center px-2 py-1 hover:bg-gray-200 cursor-pointer' onClick={() =>{
      selectedUser(userData)
    }}>
    
      <div>

         <img src={ userData.profileImg ? `${userData.profileImg}` :  `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS-bz3w3YbiCPW23zQNWR0sjH7WNZFmCV_6Q&s`}   className=' rounded-full size-12' alt="" />
      </div>
       {console.log(isOnline)}
         {isOnline && (   <div className=' rounded-full size-5 bg-green-500'></div>)   }   

      <div>
      <p className='font-bold'>{userData.fullName}</p>
    
      <p className=' text-gray-600'>Ok lets go....</p>
      </div>
       
  
      </div>
  )
}

export default People