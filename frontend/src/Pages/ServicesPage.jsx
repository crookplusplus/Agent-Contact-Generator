import React from 'react';
import Card from '../Components/Card';
import style from './ServicesPage.module.css'; 
const ServicesPage = () => {
  return (
    <Card>
      <div className={style.container}>
        <h1 className={style.title}>
          Affordable Data Solutions, So You can Focus on Closing Deals.
        </h1>
        <p className={style.description}>
          Flexible Pricing Built for Your Business Growth
        </p>
      </div>
      <ul className={style.serviceList}>
        <li className={style.serviceItem}>
          <h2 className={style.serviceTitle}>First Option</h2>
          <p className={style.servicePrice}>
            <span>$100</span>
            <span>/mo</span>
          </p>
          <button className={style.serviceButton}>
            add to cart
          </button>
          <ul className={style.serviceFeatures}>
            <li>439,000 Est. Impressions</li>
            <li>180 x 150</li>
            <li>Middle Right</li>
          </ul>
        </li>
        <li className={style.serviceItem}>
          <div className={style.hotTake}>Hot take!</div>
          <h2 className={style.serviceTitle}>Sidebar Block</h2>
          <p className={style.servicePrice}>
            <span>$400</span>
            <span>/mo</span>
          </p>
          <button className={style.serviceButton}>
            add to cart
          </button>
          <ul className={style.serviceFeatures}>
            <li>439,000 Est. Impressions</li>
            <li>300 x 250</li>
            <li>Middle Right</li>
          </ul>
        </li>
        <li className={style.serviceItem}>
          <div className={style.soldOut}>Sold Out</div>
          <h2 className={style.serviceTitle}>Premium Sidebar</h2>
          <p className={style.servicePrice}>
            <span>$2,600</span>
            <span>/mo</span>
          </p>
          <button className={style.serviceButton}>
            Join waiting list
          </button>
          <ul className={style.serviceFeatures}>
            <li>2,000,000 Est. Impressions</li>
            <li>300 x 250</li>
            <li>Top Right</li>
          </ul>
        </li>
      </ul>
    </Card>
  );
}

export default ServicesPage;

