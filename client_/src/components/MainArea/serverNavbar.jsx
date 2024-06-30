import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from '../../redux/reducer/something';

export const ServerNavbar = () => {

    const serverList = useSelector(state=>state.serverList)
    const serverDispatch = useDispatch();
  return (
    <>
        <div className="flex flex-col  items-center bg-slate-800 h-full  w-w-serverNav ">
            {serverList.map(server=><ServerNavbarIcons server={server}/>)}
            
             <button className="flex text-white" onClick={()=>serverDispatch(increment({ name: 'new server', status: 'active' }))}>+</button> 
        </div>
    </>
  )
}


const ServerNavbarIcons = ({server})=>{
    return(
        <>
            <div className="flex transition-all ease-in-out ">
            <button className="flex bg-white h-14 w-14 rounded-full transition-all hover:rounded-xl duration-300 ease-in-out m-4">
        
        {server.name}
      </button>
            </div>
        </>
    )

}


/* import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../../redux/reducer/something';

export const ServerNavbar = () => {
  const serverList = useSelector(state => state.serverList);
  const serverDispatch = useDispatch();

  const handleAddServer = () => {
    const newServer = { name: 'new server', status: 'active' };
    serverDispatch(increment(newServer));
  };

  return (
    <div className="flex fixed flex-col items-center bg-slate-800 h-full w-20">
      {serverList.map((server, index) => (
        <ServerNavbarIcons key={index} server={server} />
      ))}
      <button className="flex text-white mt-4" onClick={handleAddServer}>+</button>
    </div>
  );
};

const ServerNavbarIcons = ({ server }) => {
  return (
    <div className="flex transition-all ease-in-out">
      <button className="flex bg-white h-14 w-14 rounded-full transition-all hover:rounded-xl duration-300 ease-in-out m-4">
        
        {server.name}
      </button>
    </div>
  );
}; */
