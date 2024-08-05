import clsx from 'clsx';
import React, { useState } from 'react';
import styles from './Footer.module.css';
const Footer = () => {

  return (
    <div className={clsx(styles.container)}>
        <div className={clsx(styles.mapContainer)}></div>
        <div className={clsx(styles.bannerLogo)}></div>
        <div className={clsx(styles.contactContainer)}>
            <div className={clsx(styles.contactItem)}>
                <div className={clsx(styles.contactIcon)}>
                    cdcsd
                </div>
                <div className={clsx(styles.contactContent)}>
                    <div className={clsx(styles.contactContentHeader)}>cdscsd</div>
                    <div className={clsx(styles.contactContentInfor)}>csdcsd</div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Footer;