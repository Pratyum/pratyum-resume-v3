'use client';

import React from 'react';
import Header from './Header';
import MenuButton from './MenuButton';
import styles from '../styles/Layout.module.css';
import { useAppContext } from '../context/AppContext';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    const { isMenuOpen, isCaseDetailPage, caseId } = useAppContext();

    const getLogoColor = (caseId) => {
        switch (caseId) {
            case 'suitsupply':
                return '#fff';

            default:
                return '#000';
        }
    };

    return (
        <div className={styles.container}>
            <div
                className={[
                    styles.page_content,
                    isMenuOpen && styles.move_up,
                ].join(' ')}
            >
                {!isCaseDetailPage && (
                    <Header logoColor={getLogoColor(caseId)} delay={2.2} />
                )}
                {children}
            </div>
            <MenuButton />
            <Navbar />
        </div>
    );
};

export default Layout;
