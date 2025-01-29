import React from 'react'
import { CiSearch } from "react-icons/ci";
import { getUserList } from '../../api/userApis';
function Searchbar() {

  return (
    <div className='w-ful px-2 py-2'>

        <input type="text" className='w-[90%] bg-gray-200 px-2 py-2 rounded-2xl outline-none' placeholder='Search Peoples' />

    </div>


  )
}

export default Searchbar