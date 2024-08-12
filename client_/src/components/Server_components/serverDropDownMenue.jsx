import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function ServerDropDownMenue() {
  const [showInviteBox, setShowInviteBox] = useState(false);
 const serverinfo = useSelector(state=>state.serverInfo)
  return (
    <>
      <div onClick={() => setShowInviteBox(true)} className="flex absolute z-10 w-72 top-12 bg-zinc-800 rounded-md p-1 m-1 origin-top ">
        <ul className="flex flex-1 flex-col gap-4 p-2">
          <li className='hover:bg-blue-500 hover:text-white w-full rounded-md p-2 text-blue-500'>Invite</li>
          <li className='hover:bg-blue-500 w-full rounded-md p-2'>Server Settings</li>
          <li className='hover:bg-blue-500 w-full rounded-md p-2'>Manage Members</li>
          <li className='hover:bg-blue-500 w-full rounded-md p-2 text-red-500'>Leave Server</li>
        </ul>
      </div>

      {showInviteBox && <InviteBox closeInviteBox={() => setShowInviteBox(false)} serverinfo={serverinfo} />}
    </>
  );
}

const InviteBox = ({ closeInviteBox,serverinfo }) => {
    
   /*  useEffect(() => {
        const fetchInviteUrl = async () => {
          try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_API}guild/invite/:serverid`);
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await res.json();
            setUrl(data.url);
          } catch (error) {
            console.error('Failed to fetch invite URL:', error);
            toast.error('Failed to load invite URL');
          }
        };
    
        fetchInviteUrl();
      }, []); */


  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div className="fixed inset-0 bg-black opacity-50" onClick={closeInviteBox}></div>
      <div className="relative bg-zinc-800 rounded-lg shadow-lg w-104 p-8">
        <h3 className="text-white text-2xl mb-6">Invite Friends to Your Server</h3>
        <input 
          type="text" 
          value={`${window.location.origin}/invite/${serverinfo.url}`} 
          readOnly 
          className="w-full bg-zinc-700 text-white p-4 rounded-md mb-6 text-lg outline-none"
        />
        <div className="flex gap-4">
          <button className="flex-1 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 text-lg" onClick={()=>{
            navigator.clipboard.writeText(url);
            toast.success('Link copied')
          }}>
            Copy Link
          </button>
          <button className="bg-gray-600 text-white p-3 rounded-md hover:bg-gray-700 text-lg">
            Link Settings
          </button>
        </div>
        <button 
          onClick={closeInviteBox} 
          className="absolute top-4 right-4 text-white text-2xl hover:text-gray-400"
        >
          &times;
        </button>
      </div>
    </div>
  );
};
