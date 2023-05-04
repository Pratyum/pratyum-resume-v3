import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Header.module.css';

const Header = ({ logoColor, delay }) => {
    return (
        <div className={styles.container}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay }}
            >
                <Link href={'/'}>
                    <div
                        className={styles.logo}
                        style={{
                            '--logo-color': logoColor,
                        }}
                    >
                        PJ
                    </div>
                </Link>
            </motion.div>
        </div>
    );
};

export default Header;
