import React from 'react';
import Nav from "./Nav";
import styles from './Layout.module.css'; // Import your CSS module

const Layout = (props) => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <Nav/>
        <main className={styles.content}>
          {props.children}
          </main>
      </div>
    </div>
  )
}

export default Layout;
