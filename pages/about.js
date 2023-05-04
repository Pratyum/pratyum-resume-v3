import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

import ResponsiveCardsLayout from '../components/ResponsiveCardsLayout';
import SlidingText from '../components/SlidingText';
import { aboutData } from '../assets/data/about-data';
import styles from '../styles/About.module.css';
import { useAppContext } from '../context/AppContext';
import { useInView } from 'react-intersection-observer';

const About = () => {
    const { view } = useAppContext();
    const sec1Height = view === 'mobile' ? 830 : 388;
    const { sectionOneImages, sectionFiveData, sectionSixData } = aboutData;

    const section1Ref = useRef();
    const section3Ref = useRef();

    const [section2Ref, inView] = useInView({
        /* Optional options */
        // triggerOnce: true,
        // rootMargin: '0px 0px',
    });

    const [sec1ScrollPercent, setSec1ScrollPercent] = useState(0);
    const [sec3ScrollPercent, setSec3ScrollPercent] = useState(0);

    // section 1 scroll animation
    useEffect(() => {
        const onScroll = () => {
            const sec1OffsetTop = section1Ref.current.offsetTop; // distance of ref div from top
            const scrolledAmount = window.pageYOffset; // scrolled Y distance
            if (
                scrolledAmount >= sec1OffsetTop && // ref div is at top of screen
                scrolledAmount - sec1OffsetTop < sec1Height // only set scroll % during height of ref div
            ) {
                setSec1ScrollPercent(
                    (scrolledAmount - sec1OffsetTop) / sec1Height
                );
            }
        };

        window.addEventListener('scroll', onScroll);

        // clean up
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // section 3 scroll animation
    useEffect(() => {
        const onScroll = () => {
            const sec3OffsetTop = section3Ref.current.offsetTop; // distance of ref div from top
            const scrolledAmount = window.pageYOffset; // scrolled Y distance
            if (
                scrolledAmount >= sec3OffsetTop && // ref div is at top of screen
                scrolledAmount - sec3OffsetTop < 900 // only set scroll % during height of ref div
            ) {
                setSec3ScrollPercent((scrolledAmount - sec3OffsetTop) / 900);
            }
        };

        window.addEventListener('scroll', onScroll);

        // clean up
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className={styles.container}>
            {/* section 1 */}
            <section className={styles.section1}>
                <div className={styles.intro_text_wrapper}>
                    <p className={styles.intro_text}>
                    Driven by passion, I think of futuristic ideas and strive to make it a possibility today.
                    </p>
                </div>
                <div
                    className={styles.relative_img_container}
                    ref={section1Ref}
                >
                    <div className={styles.sticky_img_container}>
                        <div
                            className={styles.sliding_img_mover}
                            style={{
                                translate: `${
                                    -sec1ScrollPercent * sec1Height
                                }px 0`,
                            }}
                        >
                            <div className={styles.sliding_img_grid}>
                                {sectionOneImages.map((img, idx) => (
                                    <div
                                        className={styles.sliding_img_wrapper}
                                        key={idx}
                                    >
                                        <img
                                            className={styles.sliding_img}
                                            src={img.imgUrl}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* section 2 */}
            <section className={styles.section2}>
                <div
                    className={styles.section2_indicator}
                    ref={section2Ref}
                ></div>
                <div className={styles.section2_flex_wrapper}>
                    <div className={styles.section2_text_wrapper}>
                        <p
                            className={[
                                styles.initial_top_p,
                                inView && styles.final_top_p,
                            ].join(' ')}
                        >
                            Always ready to build cool projects
                        </p>
                        <p
                            className={[
                                styles.initial_bottom_p,
                                inView && styles.final_bottom_p,
                            ].join(' ')}
                        >
                            Web3 and AI Entusiast
                        </p>
                    </div>
                    {/* <div className={styles.section2_text_wrapper}>
                        <p
                            className={[
                                styles.initial_top_p,
                                inView && styles.final_top_p,
                            ].join(' ')}
                        >
                            is blinded by numbers,
                        </p>
                        <p
                            className={[
                                styles.initial_bottom_p,
                                inView && styles.final_bottom_p,
                            ].join(' ')}
                        >
                            are driven by emotion.
                        </p>
                    </div> */}
                </div>
            </section>

            {/* section 3 */}
            <section className={styles.section3}>
                <div className={styles.section3_wrapper} ref={section3Ref}>
                    <div className={styles.section3_sticky}>
                        <div
                            style={{
                                transform: `translateX(${
                                    sec3ScrollPercent * 510 >= 255
                                        ? sec3ScrollPercent * -510 +
                                          510 * (1 - sec3ScrollPercent)
                                        : 0
                                }px) translateZ(0px)`,
                            }}
                        >
                            <div className={styles.section3_flex}>
                                <div
                                    style={{
                                        top: '100%',
                                        left: '-70vw',
                                        width: '90vw',
                                        opacity: `${sec3ScrollPercent * 2}`,
                                        transform: `translateX(${
                                            sec3ScrollPercent * 510 >= 255
                                                ? sec3ScrollPercent * 510 -
                                                  510 * (1 - sec3ScrollPercent)
                                                : 0
                                        }px) translateY(${
                                            (1 - sec3ScrollPercent * 2) * 200 >=
                                            0
                                                ? (1 - sec3ScrollPercent * 2) *
                                                  200
                                                : 0
                                        }%) translateZ(0px)`,
                                    }}
                                >
                                    <div
                                        className={styles.section3_text_wrapper}
                                    >
                                        <div className={styles.section3_text}>
                                        I believe in optimal programming while I build knowledge base in specific areas viz. web development and embedded technology – the gateway for the future.
                                        </div>
                                        <div className={styles.section3_link}>
                                            <a href='#'>
                                                <SlidingText
                                                    text={'read manifesto'}
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.section3_images_wrapper}>
                                    <div
                                        className={styles.section3_image_div}
                                        style={{
                                            opacity: 1,
                                            transform: `translateX(0%) translateY(0px) scale(${
                                                -sec3ScrollPercent + 1.5 >= 1
                                                    ? -sec3ScrollPercent + 1.5
                                                    : 1
                                            }) translateZ(0px)`,
                                        }}
                                    >
                                        <img
                                            src='/images/nft_mint.webp'
                                            alt='mammut'
                                        />
                                        <div
                                            className={
                                                styles.image_text_wrapper
                                            }
                                            style={{
                                                opacity: `${
                                                    sec3ScrollPercent >= 0.4
                                                        ? 1
                                                        : 0
                                                }`,
                                            }}
                                        >
                                            <span
                                                className={styles.image_title}
                                            >
                                                NFT Minter
                                            </span>
                                            <span className={styles.image_dot}>
                                                {' '}
                                                ·{' '}
                                            </span>
                                            <span className={styles.image_desc}>
                                                Mint your own NFTs
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className={styles.section3_image_div}
                                        style={{
                                            opacity: `${sec3ScrollPercent * 2}`,
                                            transform: `translateX(${
                                                (1 - sec3ScrollPercent * 2) *
                                                    50 >=
                                                0
                                                    ? (1 -
                                                          sec3ScrollPercent *
                                                              2) *
                                                      50
                                                    : 0
                                            }%) translateY(${
                                                (1 - sec3ScrollPercent * 2) *
                                                    120 >=
                                                0
                                                    ? (1 -
                                                          sec3ScrollPercent *
                                                              2) *
                                                      120
                                                    : 0
                                            }%) scale(1) translateZ(0px)`,
                                        }}
                                    >
                                        <img
                                            src='/images/uscan.webp'
                                            alt='moooi'
                                        />
                                        <div
                                            className={
                                                styles.image_text_wrapper
                                            }
                                            style={{
                                                opacity: `${
                                                    sec3ScrollPercent >= 0.4
                                                        ? 1
                                                        : 0
                                                }`,
                                            }}
                                        >
                                            <span
                                                className={styles.image_title}
                                            >
                                                uScan
                                            </span>
                                            <span className={styles.image_dot}>
                                                {' '}
                                                ·{' '}
                                            </span>
                                            <span className={styles.image_desc}>
                                                A Barcode Scanner to mark collection of goodie bags
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className={styles.section3_image_div}
                                        style={{
                                            opacity: `${sec3ScrollPercent * 2}`,
                                            transform: `translateX(${
                                                (1 - sec3ScrollPercent * 2) *
                                                    50 >=
                                                0
                                                    ? (1 -
                                                          sec3ScrollPercent *
                                                              2) *
                                                      50
                                                    : 0
                                            }%) translateY(${
                                                (1 - sec3ScrollPercent * 2) *
                                                    120 >=
                                                0
                                                    ? (1 -
                                                          sec3ScrollPercent *
                                                              2) *
                                                      120
                                                    : 0
                                            }%) scale(1) translateZ(0px)`,
                                        }}
                                    >
                                        <img
                                            src='/images/mdp_poster.webp'
                                            alt='suitsupply'
                                        />
                                        <div
                                            className={
                                                styles.image_text_wrapper
                                            }
                                            style={{
                                                opacity: `${
                                                    sec3ScrollPercent >= 0.4
                                                        ? 1
                                                        : 0
                                                }`,
                                            }}
                                        >
                                            <span
                                                className={styles.image_title}
                                            >
                                                MDP
                                            </span>
                                            <span className={styles.image_dot}>
                                                {' '}
                                                ·{' '}
                                            </span>
                                            <span className={styles.image_desc}>
                                                Build a robot to navigate a maze
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* section 4 */}
            <section className={styles.section4}>
                <div className={styles.section4_text_wrapper}>
                    <p>
                        TODO: Add a blockquote
                    </p>
                    <div>
                        <a href='#'>
                            <SlidingText text={'join the team'} />
                        </a>
                    </div>
                </div>
                <ResponsiveCardsLayout />
            </section>

            {/* section 5 - our expertise */}
            <section className={styles.section5}>
                <header className={styles.section5_header}>
                    <h2>My Experience</h2>
                </header>
                <div className={styles.section5_list_wrapper}>
                    {sectionFiveData.map((item, idx) => (
                        <li key={idx}>
                            <h2>{item.heading}</h2>
                            <ul className={styles.section5_ul}>
                                {item.list.map((listItem, index) => (
                                    <li key={index}>{listItem}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </div>
            </section>

            {/* section 6 - stats & facts */}
            <section className={styles.section6}>
                <header className={styles.section6_header}>
                    <h2>stats & facts</h2>
                </header>
                <div className={styles.section6_list_wrapper}>
                    {sectionSixData.map((item, idx) => (
                        <li key={idx}>
                            <p>{item.number}</p>
                            <div className={styles.section6_text_wrapper}>
                                <p>{item.text}</p>
                                {item.link && (
                                    <a href='#'>
                                        <SlidingText text={item.link} />
                                    </a>
                                )}
                            </div>
                        </li>
                    ))}
                </div>
            </section>

            {/* section 7 - last page */}
            <section className={styles.section7}>
                <div className={styles.section7_wrapper}>
                    <div className={styles.section7_text_wrapper}>
                        <h2>Wanna Say Hi?</h2>
                        <a href='/contact'>
                            <SlidingText text={'reach out'} />
                        </a>
                    </div>
                </div>
                <div className={styles.section7_wrapper}>
                    <div className={styles.section7_text_wrapper}>
                        <h2>Check out my projects</h2>
                        <a href='/cases'>
                            <SlidingText text={'Click here'} />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
