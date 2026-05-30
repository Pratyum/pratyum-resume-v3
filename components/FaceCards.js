import React from 'react';
import styles from '../styles/FaceCards.module.css';
import Image from 'next/image';

const FaceCards = ({ faceData }) => {
    const { imgUrl, name, role } = faceData;

    return (
        <div className={styles.container}>
            <Image
                src={imgUrl}
                alt={`${name}_${role}`}
                width={500}
                height={500}
                sizes="(max-width: 768px) 50vw, 25vw"
                style={{
                    width: '100%',
                    height: 'auto',
                }}
            />
            <div className={styles.text_wrapper}>
                <p className={styles.name}>{name}</p>
                <p className={styles.dot}>·</p>
                <p className={styles.role}>{role}</p>
            </div>
        </div>
    );
};

export default FaceCards;
