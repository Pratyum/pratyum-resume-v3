'use client';

import React, { useRef, useEffect, useState } from 'react';
// import { useAppContext } from '../context/AppContext';
import styles from '../styles/CaseCardsLayout.module.css';
import { getTotalScrollable } from '../utils/functions';
import CaseCards from './CaseCards';
import Link from 'next/link';

const CaseCardsLayout = ({ leftColImages, rightColImages }) => {
    // const { isMobileView, isMenuOpen } = useAppContext();
    const leftColRef = useRef();
    const rightColRef = useRef();

    const [percentToScroll, setPercentToScroll] = useState(0);
    const [colHeightDiff, setColHeightDiff] = useState(0);

    // for auto scroll down page
    // useEffect(() => {
    //     const pageScroll = () => {
    //         window.scrollBy(0, 0.5);
    //         setTimeout(pageScroll, 20);
    //     };
    //     let startScroll = setTimeout(() => {
    //         pageScroll();
    //     }, 4200);

    //     // stop auto scroll if mobile view
    //     if (isMobileView) {
    //         clearTimeout(startScroll);
    //     }
    // }, [isMobileView]);

    // for offset scrolling left and right columns
    useEffect(() => {
        setColHeightDiff(
            leftColRef.current.offsetHeight - rightColRef.current.offsetHeight
        );

        const onScroll = () => {
            const rightColOffsetTop = rightColRef.current.offsetTop;
            const totalScrollableAfterEl =
                // getTotalScrollable works to end scroll at end of page scroll
                getTotalScrollable() - rightColOffsetTop;
            let scrolledAmount = window.pageYOffset;

            if (scrolledAmount >= rightColOffsetTop) {
                setPercentToScroll(
                    (scrolledAmount - rightColOffsetTop) /
                        totalScrollableAfterEl
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
        <div className={styles.container}>
            <div ref={leftColRef} className={styles.left_col}>
                {leftColImages.map((caseData, idx) => {
                    return (
                        <div
                            key={'left' + idx}
                            className={styles.left_item_container}
                        >
                            {caseData.caseId ? (
                                <Link href={`/cases/${caseData.caseId}`}>
                                    <CaseCards caseData={caseData} />
                                </Link>
                            ) : (
                                <CaseCards caseData={caseData} />
                            )}
                        </div>
                    );
                })}
            </div>
            <div
                ref={rightColRef}
                className={styles.right_col}
                style={{
                    translate: `0 ${percentToScroll * colHeightDiff}px`,
                }}
            >
                {rightColImages.map((caseData, idx) => {
                    return (
                        <div
                            key={'right' + idx}
                            className={styles.right_item_container}
                        >
                            {caseData.caseId ? (
                                <Link href={`/cases/${caseData.caseId}`}>
                                    <CaseCards caseData={caseData} />
                                </Link>
                            ) : (
                                <CaseCards caseData={caseData} />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CaseCardsLayout;
