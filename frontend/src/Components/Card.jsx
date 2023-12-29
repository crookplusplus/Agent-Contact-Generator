import React from 'react'
import styles from './Card.module.css'

const Card = (props) => {
  return (
    <section className={styles.cardContainer}>
        <div className={styles.cardWrapper}>
            {props.children}
        </div>
    </section>
  )
}

export default Card;