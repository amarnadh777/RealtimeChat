import React, { useEffect } from 'react'

import Chatwindow from '../../components/chatWindow/Chatwindow'
import SIdebar from '../../components/sideBar/SIdebar'

function Chatpage() {

 
  return (
        <div className='h-screen flex'> 
        <div className= ' hidden md:block '>

        <SIdebar/>
        
        </div>

        <div className='w-full flex-1'>
        <Chatwindow/>
        </div>
     
        </div>
  )
}

export default Chatpage