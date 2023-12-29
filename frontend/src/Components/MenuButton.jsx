import React from 'react'
import { Link } from "react-router-dom";
import styles from './MenuButton.module.css';

const MenuButton = (props) => {
  return (
    <button className={styles.menuButton}>
      <Link to={props.site} className={styles.linkStyle}>{props.name}</Link>
    </button>
  )
}

export default MenuButton