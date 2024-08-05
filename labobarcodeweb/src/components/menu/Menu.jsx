import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'
import './Menu.css'

const Menu = ({menuData}) => {
    const [click, setClick] = useState(false)

    const handleClick = () => setClick(!click)
    return (
        <div className='navbar'>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {
              menuData.map(i=> (<li key={i.id} className='nav-item'><a href={i.href}></a>{i.name}</li>))
            }
            </ul>
            <div className='hamburger' onClick={handleClick}>
                {click ? (<FaTimes size={30} style={{ color: '#f8f8f8' }} />) : (<FaBars size={30} style={{ color: '#f8f8f8' }} />)}

            </div>
        </div>
    )
}

export default Menu