import React from 'react';
import styles from '../styles/SlidingText.module.css';

const SlidingText = ({ text , as='div' , ...extra  }) => {
    const Component = as; // Use the passed component type
    return (
        <Component className={`${styles.container} ${extra?.className??''}`} {...extra}>
            <div className={styles.text}>{text}</div>
            <div className={styles.dot}></div>
        </Component>
    );
};

export default SlidingText;
