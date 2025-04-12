'use client';

import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import styles from '../styles/Navbar.module.css';
import NavItem from './NavItem';
import { navData } from '../assets/data/nav-data';

const Navbar = () => {
    const { isMenuOpen, setIsMenuOpen } = useAppContext();
    const [cursorPosition, setCursorPosition] = useState({
        x: 0,
        y: 0,
    });

    const handleMouseMove = (e) => {
        if (cursorPosition.x) {
            document
                .getElementById('Navbar_scrollable_div')
                .scrollBy(e.clientX - cursorPosition.x, 0);
        }
        setCursorPosition({
            x: e.clientX,
            y: e.clientY,
        });
    };

    return (
        <>
            {isMenuOpen && (
                <div
                    className={styles.backdrop}
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
            <nav
                className={[
                    styles.container,
                    isMenuOpen && styles.nav_open,
                ].join(' ')}
            >
                <div
                    className={[
                        styles.nav_items_wrapper,
                        isMenuOpen && styles.show_nav_items,
                    ].join(' ')}
                    id='Navbar_scrollable_div'
                    onMouseMove={(e) => handleMouseMove(e)}
                >
                    <div className={styles.nav_flex}>
                        {navData.map((navItem, idx) => {
                            return (
                                <React.Fragment key={idx}>
                                    <NavItem data={navItem} />
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
