import React from 'react'
import { Link } from "react-router-dom";

const MenuButton = (props) => {
  return (
    <button className='bg-color2 text-color4 font-[Menlo] py-1 px-4 rounded hover:bg-color3 hover:text-color5 duration-300'>
      <Link to={props.site}>{props.name}</Link>
    </button>
  )
}

export default MenuButton
