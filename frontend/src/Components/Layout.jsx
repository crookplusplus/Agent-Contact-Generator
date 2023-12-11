import React from 'react';
import Nav from "./Nav";

const Layout = (props) => {
  return (
    <div className="relative bg-fixed bg-cover bg-center bg-[url('../src/assets/NewBG.jpg')] w-full h-screen">
      <div className="absolute inset-0 overflow-y-auto">
        <Nav/>
        <main className='flex top-24 m-10'>{props.children}</main>
      </div>
    </div>
  )
}

export default Layout
