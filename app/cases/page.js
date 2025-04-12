'use client'
import React, { useRef, useState, useEffect } from 'react';
import styles from '../../styles/Cases.module.css';
import { getTotalScrollable } from '../../utils/functions';
import CaseCards from '../../components/CaseCards';
import { casesData } from '../../assets/data/cases-data';
import Filter from '../../components/Filter';
import { useAppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Cases = () => {
    const { view, isFilterOpen, setIsFilterOpen, selectedFilter } =
        useAppContext();

    const leftColRef = useRef();
    const rightColRef = useRef();

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
        const filteredCases = casesData.filter((caseData) =>
            caseData.filterBy.includes(selectedFilter)
        );
        const leftoverCases = casesData.filter(
            (caseData) => !caseData.filterBy.includes(selectedFilter)
        );

        const filteredOrderedCases = [...filteredCases, ...leftoverCases];
        let mobileLeft = [];
        let mobileRight = [];
        let leftLeft = [];
        let left = [];
        let right = [];
        let rightRight = [];

        for (let i = 0; i < filteredOrderedCases.length; i++) {
            if (i % 2 === 0) {
                mobileLeft.push(filteredOrderedCases[i]);
            } else {
                mobileRight.push(filteredOrderedCases[i]);
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
    }, [selectedFilter]);

    // for offset scrolling left and right columns
    useEffect(() => {
        setColHeightDiff(
            leftColRef?.current?.offsetHeight -
                rightColRef?.current?.offsetHeight
        );

        const onScroll = () => {
            const rightColOffsetTop = rightColRef.current.offsetTop;
            const totalScrollableAfterEl =
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
    }, [imageLists, view]);

    const handleCardClick = () => {
        // make sure filter is closed in context
        setIsFilterOpen(false);
    };

    return (
        <div className={styles.container}>
            {/* filter starts */}
            <div
                className={[
                    styles.filter_container,
                    isFilterOpen && styles.filter_open,
                ].join(' ')}
            >
                <Filter onClose={() => setIsFilterOpen(false)} />
            </div>
            <button
                className={[
                    styles.filter_button,
                    isFilterOpen && styles.hide_filter_button,
                ].join(' ')}
                onClick={() => setIsFilterOpen(true)}
            >
                {`filter work ${selectedFilter && '(1)'}`}
            </button>
            {/* filter ends */}

            {/* responsive card layout starts */}
            {view === 'mobile' ? (
                <>
                    <motion.div
                        initial={{ y: 100, opacity: 0.5 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div
                            ref={leftColRef}
                            className={[
                                styles.left_col,
                                isFilterOpen && styles.move_left_col,
                            ].join(' ')}
                        >
                            {imageLists.mobile.left.map((caseData, idx) => {
                                return (
                                    <div
                                        key={'left' + idx}
                                        className={styles.left_item_container}
                                        onClick={handleCardClick}
                                    >
                                        <Link
                                            href={`/cases/${caseData.caseId}`}
                                        >
                                            <CaseCards
                                                caseData={caseData}
                                                isBlurred={
                                                    selectedFilter
                                                        ? !caseData.filterBy.includes(
                                                              selectedFilter
                                                          )
                                                        : false
                                                }
                                            />
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div
                            ref={rightColRef}
                            className={[
                                styles.right_col,
                                isFilterOpen && styles.move_right_col,
                            ].join(' ')}
                            style={{
                                translate: `0 ${
                                    percentToScroll * colHeightDiff
                                }px`,
                            }}
                        >
                            {imageLists.mobile.right.map((caseData, idx) => {
                                return (
                                    <div
                                        key={'right' + idx}
                                        className={styles.right_item_container}
                                        onClick={handleCardClick}
                                    >
                                        <Link
                                            href={`/cases/${caseData.caseId}`}
                                        >
                                            <CaseCards
                                                caseData={caseData}
                                                isBlurred={
                                                    selectedFilter
                                                        ? !caseData.filterBy.includes(
                                                              selectedFilter
                                                          )
                                                        : false
                                                }
                                            />
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </>
            ) : (
                <>
                    <motion.div
                        initial={{ y: 100, opacity: 0.5 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div
                            ref={leftColRef}
                            className={[
                                styles.left_col,
                                isFilterOpen && styles.move_left_col,
                            ].join(' ')}
                        >
                            {imageLists.desktop.leftLeft.map(
                                (caseData, idx) => {
                                    return (
                                        <div
                                            key={'leftLeft' + idx}
                                            className={
                                                styles.left_item_container
                                            }
                                            onClick={handleCardClick}
                                        >
                                            <Link
                                                href={`/cases/${caseData.caseId}`}
                                            >
                                                <CaseCards
                                                    caseData={caseData}
                                                    isBlurred={
                                                        selectedFilter
                                                            ? !caseData.filterBy.includes(
                                                                  selectedFilter
                                                              )
                                                            : false
                                                    }
                                                />
                                            </Link>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ y: -100, opacity: 0.5 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div
                            ref={rightColRef}
                            className={[
                                styles.left_col,
                                isFilterOpen && styles.move_left_col,
                            ].join(' ')}
                            style={{
                                translate: `0 ${
                                    percentToScroll * colHeightDiff
                                }px`,
                            }}
                        >
                            {imageLists.desktop.left.map((caseData, idx) => {
                                return (
                                    <div
                                        key={'left' + idx}
                                        className={styles.right_item_container}
                                        onClick={handleCardClick}
                                    >
                                        <Link
                                            href={`/cases/${caseData.caseId}`}
                                        >
                                            <CaseCards
                                                caseData={caseData}
                                                isBlurred={
                                                    selectedFilter
                                                        ? !caseData.filterBy.includes(
                                                              selectedFilter
                                                          )
                                                        : false
                                                }
                                            />
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div
                            className={[
                                styles.right_col,
                                isFilterOpen && styles.move_right_col,
                            ].join(' ')}
                        >
                            {imageLists.desktop.right.map((caseData, idx) => {
                                return (
                                    <div
                                        key={'right' + idx}
                                        className={styles.left_item_container}
                                        onClick={handleCardClick}
                                    >
                                        <Link
                                            href={`/cases/${caseData.caseId}`}
                                        >
                                            <CaseCards
                                                caseData={caseData}
                                                isBlurred={
                                                    selectedFilter
                                                        ? !caseData.filterBy.includes(
                                                              selectedFilter
                                                          )
                                                        : false
                                                }
                                            />
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div
                            className={[
                                styles.right_col,
                                isFilterOpen && styles.move_right_col,
                            ].join(' ')}
                            style={{
                                translate: `0 ${
                                    percentToScroll * colHeightDiff * 2.81 // hacky!
                                }px`,
                            }}
                        >
                            {imageLists.desktop.rightRight.map(
                                (caseData, idx) => {
                                    return (
                                        <div
                                            key={'rightRight' + idx}
                                            className={
                                                styles.right_item_container
                                            }
                                            onClick={handleCardClick}
                                        >
                                            <Link
                                                href={`/cases/${caseData.caseId}`}
                                            >
                                                <CaseCards
                                                    caseData={caseData}
                                                    isBlurred={
                                                        selectedFilter
                                                            ? !caseData.filterBy.includes(
                                                                  selectedFilter
                                                              )
                                                            : false
                                                    }
                                                />
                                            </Link>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </motion.div>
                </>
            )}
            {/* responsive card layout ends */}
        </div>
    );
};

export default Cases;
