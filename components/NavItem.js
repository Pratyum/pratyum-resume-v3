import React from 'react';
import { useAppContext } from '../context/AppContext';
import styles from '../styles/NavItem.module.css';
import Link from 'next/link';
import Image from 'next/image';

const NavItem = ({ data }) => {
    const { view, setIsMenuOpen } = useAppContext();
    const { title, imgUrl, mobileImgUrl, linkTo } = data;
    const isMobile = view === 'mobile';

    return (
        <div className={styles.container} onClick={() => setIsMenuOpen(false)}>
            <Link href={linkTo}>
                <div className={styles.dot} />
                <div className={styles.title}>{title}</div>
                <div className={styles.image_container}>
                    <Image
                        className={styles.image}
                        src={isMobile ? mobileImgUrl : imgUrl}
                        alt={title}
                        width={isMobile ? 1036 : 3540}
                        height={isMobile ? 2134 : 2124}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        priority
                    />
                </div>
            </Link>
        </div>
    );
};

export default NavItem;
