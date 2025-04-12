'use client';

import React, { useRef, useState, useEffect } from 'react';
import styles from '../styles/ResponsiveCardsLayout.module.css';
import { aboutData } from '../assets/data/about-data';
import { useAppContext } from '../context/AppContext';
import FaceCards from './FaceCards';

const ResponsiveCardsLayout = () => {
    const { view } = useAppContext();

    const leftColRef = useRef();
    const rightColRef = useRef();
    const containerRef = useRef();

    const [percentToScroll, setPercentToScroll] = useState(0);
    const [colHeightDiff, setColHeightDiff] = useState(0);

    const [imageLists, setImageLists] = useState({
        mobile: {
            left: [],
            right: [],
        },
        desktop: {
            leftLeft: [],
            left: [],
            right: [],
            rightRight: [],
        },
    });

    // filter casesData then divide into 2(mobile) and 4(desktop) columns
    useEffect(() => {
        const faceData = aboutData.sectionFourData.faceImages;

        let mobileLeft = [];
        let mobileRight = [];
        let leftLeft = [];
        let left = [];
        let right = [];
        let rightRight = [];

        for (let i = 0; i < faceData.length; i++) {
            if (i % 2 === 0) {
                mobileLeft.push(faceData[i]);
            } else {
                mobileRight.push(faceData[i]);
            }
        }

        for (let i = 0; i < mobileLeft.length; i++) {
            if (i % 2 === 0) {
                left.push(mobileLeft[i]);
            } else {
                leftLeft.push(mobileLeft[i]);
            }
        }

        for (let i = 0; i < mobileRight.length; i++) {
            if (i % 2 === 0) {
                right.push(mobileRight[i]);
            } else {
                rightRight.push(mobileRight[i]);
            }
        }

        setImageLists({
            ...imageLists,
            mobile: {
                left: mobileLeft,
                right: mobileRight,
            },
            desktop: {
                leftLeft: leftLeft,
                left: left,
                right: right,
                rightRight: rightRight,
            },
        });
    }, []);

    // for offset scrolling left and right columns
    useEffect(() => {
        const onScroll = () => {
            setColHeightDiff(
                leftColRef?.current?.offsetHeight -
                    rightColRef?.current?.offsetHeight
            );
            const totalContainerHeight = containerRef?.current?.offsetHeight;
            const rightColOffsetTop = rightColRef.current.offsetTop;

            let scrolledAmount = window.pageYOffset;

            if (scrolledAmount >= rightColOffsetTop) {
                setPercentToScroll(
                    (scrolledAmount - rightColOffsetTop) / totalContainerHeight
                );
            } else {
                setPercentToScroll(0);
            }
        };

        window.addEventListener('scroll', onScroll);

        // clean up
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className={styles.container} ref={containerRef}>
            {/* responsive card layout starts */}
            {view === 'mobile' ? (
                <>
                    <div
                        ref={leftColRef}
                        className={[styles.left_col].join(' ')}
                    >
                        {imageLists.mobile.left.map((faceData, idx) => {
                            return (
                                <div
                                    key={'left' + idx}
                                    className={styles.left_item_container}
                                >
                                    <FaceCards faceData={faceData} />
                                </div>
                            );
                        })}
                    </div>

                    <div
                        ref={rightColRef}
                        className={[styles.right_col].join(' ')}
                        style={{
                            translate: `0 ${percentToScroll * colHeightDiff}px`,
                        }}
                    >
                        {imageLists.mobile.right.map((faceData, idx) => {
                            return (
                                <div
                                    key={'right' + idx}
                                    className={styles.right_item_container}
                                >
                                    <FaceCards faceData={faceData} />
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : (
                <>
                    <div
                        ref={leftColRef}
                        className={[styles.left_col].join(' ')}
                    >
                        {imageLists.desktop.leftLeft.map((faceData, idx) => {
                            return (
                                <div
                                    key={'leftLeft' + idx}
                                    className={styles.left_item_container}
                                >
                                    <FaceCards faceData={faceData} />
                                </div>
                            );
                        })}
                    </div>

                    <div
                        ref={rightColRef}
                        className={[styles.right_col].join(' ')}
                        style={{
                            translate: `0 ${percentToScroll * colHeightDiff}px`,
                        }}
                    >
                        {imageLists.desktop.left.map((faceData, idx) => {
                            return (
                                <div
                                    key={'left' + idx}
                                    className={styles.right_item_container}
                                >
                                    <FaceCards faceData={faceData} />
                                </div>
                            );
                        })}
                    </div>

                    <div className={[styles.left_col].join(' ')}>
                        {imageLists.desktop.rightRight.map((faceData, idx) => {
                            return (
                                <div
                                    key={'rightRight' + idx}
                                    className={styles.right_item_container}
                                >
                                    <FaceCards faceData={faceData} />
                                </div>
                            );
                        })}
                    </div>

                    <div
                        className={[styles.right_col].join(' ')}
                        style={{
                            translate: `0 ${percentToScroll * colHeightDiff}px`,
                        }}
                    >
                        {imageLists.desktop.right.map((faceData, idx) => {
                            return (
                                <div
                                    key={'right' + idx}
                                    className={styles.left_item_container}
                                >
                                    <FaceCards faceData={faceData} />
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
            {/* responsive card layout ends */}
        </div>
    );
};

export default ResponsiveCardsLayout;
