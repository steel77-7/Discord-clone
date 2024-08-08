import React from 'react'

export default function ServerDropDownMenue() {
  return (
    <>
    <div className="flex absolute z-10 w-72 top-12 bg-zinc-800 rounded-md p-1 m-1">
        <ul className="flex flex-1 flex-col gap-4 p-2">
            <li className='hover:bg-blue-500 w-full rounded-md p-2'>Invite</li>
            <li className='hover:bg-blue-500 w-full rounded-md p-2'>Server Settings </li>
            <li className='hover:bg-blue-500 w-full rounded-md p-2'>Manage members</li>
            <li className='hover:bg-blue-500 w-full rounded-md p-2'>leave server</li>
            


        </ul>
    </div>
    </>
  )
}
