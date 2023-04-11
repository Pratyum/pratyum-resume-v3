import Image from 'next/image';
import React from 'react';
import styles from '../styles/CaseCards.module.css';

const CaseCards = ({ caseData, isBlurred }) => {
    const { url, title, desc, textColorOverride, tag } = caseData;

    return (
        <div className={styles.container}>
            <Image
                src={url}
                alt={title}
                fill={true}
                sizes='(max-width: 768px) 100%,
                100%'
                style={{ objectFit: 'cover' }}
            />
            <div className={styles.text_wrapper}>
                <div
                    className={styles.text}
                    style={textColorOverride && { color: textColorOverride }}
                >
                    <span className={styles.title}>{title}</span>
                    <span className={styles.separator}>&nbsp;·&nbsp;</span>
                    <span className={styles.desc}>{desc}</span>
                </div>
            </div>
            {tag && <div className={styles.tag}>{tag}</div>}
            {isBlurred && <div className={styles.blurred}></div>}
        </div>
    );
};

export default CaseCards;
