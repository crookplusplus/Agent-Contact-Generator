import React from 'react'
import { Link } from "react-router-dom";
import styles from './MenuItem.module.css';

const MenuItem = (props) => {
  return (
    <li className={styles.menuItem}>
        <Link to={props.site} className={styles.link}>{ props.name }</Link>
    </li>
  )
}

export default MenuItem