import React from 'react'
import { Link } from "react-router-dom";

const MenuItem = (props) => {
  return (
    <li className="w-28 md:w-auto md:items-center md:ml-2 text-3xl md:my-0 my-6 mx-5 hover:text-4xl">
        <Link to={props.site} className="text-white font-sil hover:text-color4 duration-500">{ props.name }</Link>
    </li>
  )
}

export default MenuItem
