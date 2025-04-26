'use client';
import { useAppContext } from "@/context/AppContext";
import CaseCardsLayout from "./CaseCardsLayout";
import SlidingText from "./SlidingText";
import styles from '@/styles/Contact.module.css';
import { contactImages } from "@/assets/data/contact-data";

export const ContactContent = () => {
    const { view } = useAppContext();
    const leftColImages = contactImages.filter((img) => img.col === 'left');
    const rightColImages = contactImages.filter((img) => img.col === 'right');

    const getHeadingHeight = () => {
        if (view === 'mobile') return 60;
        if (view === 'desktop') return 70;
        if (view === 'largeDesktop') return 120;
    };

    return (
        <div className={styles.container}>

            <div className={styles.top}>
                <CaseCardsLayout
                    leftColImages={leftColImages}
                    rightColImages={rightColImages}
                />
            </div>

            <div className={styles.bottom}>
                <h1 className={styles.heading1}>Get in touch</h1>
                <div className={styles.us_container}>
                    <div>
                        <h2 className={styles.heading2}>Write to me</h2>
                        <div className={styles.sliding_text}>
                            <SlidingText text={'hello@pratyumjagan.com'} />
                        </div>
                    </div>
                    <div>
                        <h2 className={styles.heading2}>Call Me</h2>
                        <div className={styles.sliding_text}>
                            <SlidingText text={'+91 94444 89090'} />
                        </div>
                    </div>
                    <div>
                        <h2
                            className={[
                                styles.heading2,
                                styles.custom_margin,
                            ].join(' ')}
                        >
                            Other Contact Links
                        </h2>
                        <ul className={styles.ul}>
                            <li className={styles.sliding_text}>
                                <SlidingText text={'Instagram'} />
                            </li>
                            <li className={styles.sliding_text}>
                                <SlidingText text={'Facebook'} />
                            </li>
                            <li className={styles.sliding_text}>
                                <SlidingText text={'Twitter'} />
                            </li>
                            <li className={styles.sliding_text}>
                                <SlidingText text={'LinkedIn'} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};