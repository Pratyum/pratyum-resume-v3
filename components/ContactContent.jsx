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
                            <SlidingText as="a" href="mailto:hi@pratyum.in" text={'hi@pratyum.in'} />
                        </div>
                    </div>
                    <div>
                        <h2 className={styles.heading2}>Call Me</h2>
                        <div className={styles.sliding_text}>
                            <SlidingText as="a" href="tel:+919444489090" text={'+91 94444 89090'} />
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
                                <SlidingText as="a" href="https://www.instagram.com/pratyumj/" text={'Instagram'} />
                            </li>
                            <li className={styles.sliding_text}>
                                <SlidingText as="a" href="https://www.facebook.com/pratyum.jagan" text={'Facebook'} />
                            </li>
                            <li className={styles.sliding_text}>
                                <SlidingText as="a" href="https://x.com/theDrMurder" text={'Twitter'} />
                            </li>
                            <li className={styles.sliding_text}>
                                <SlidingText as="a" href="https://www.linkedin.com/in/pratyumjagannath/" text={'LinkedIn'} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};