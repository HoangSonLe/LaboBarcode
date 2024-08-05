import React, { useState } from 'react';
import styles from './Menu.module.css';

const Menu = ({menuData}) => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className={styles.menuToggle} onClick={toggleMenu}>
        Menu
      </div>
      <ul className={`${styles.menu} ${open ? styles.open : ''}`}>
        {
            () => {
                menuData.map(i=> <li className={styles.menuItem} >i.name</li>)
            }
        }
        
        <li className={styles.menuItem}>About</li>
        <li className={styles.menuItem}>Services</li>
        <li className={styles.menuItem}>Contact</li>
      </ul>
    </div>
  );
};

export default Menu;