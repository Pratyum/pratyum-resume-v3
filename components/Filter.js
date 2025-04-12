'use client';

import React from 'react';
import styles from '../styles/Filter.module.css';
import { filterData } from '../assets/data/filter-data';
import { useAppContext } from '../context/AppContext';

const Filter = () => {
    const { isFilterOpen, setIsFilterOpen, selectedFilter, setSelectedFilter } =
        useAppContext();

    const handleFilterClick = (filter) => {
        if (filter === selectedFilter) {
            setSelectedFilter('');
        } else {
            setSelectedFilter(filter);
        }
    };

    return (
        <div className={styles.container}>
            <div
                className={[
                    styles.content,
                    isFilterOpen && styles.content_open,
                ].join(' ')}
            >
                {filterData.map((category, idx) => {
                    return (
                        <section key={idx}>
                            <h2 className={styles.heading}>
                                {category.heading}
                            </h2>
                            <ul className={styles.list_wrapper}>
                                {category.items.map((item, itemIdx) => {
                                    return (
                                        <li
                                            key={itemIdx}
                                            className={styles.list_item}
                                        >
                                            <button
                                                className={styles.button}
                                                onClick={() =>
                                                    handleFilterClick(
                                                        item.title
                                                    )
                                                }
                                            >
                                                <span
                                                    className={
                                                        item.title ===
                                                        selectedFilter
                                                            ? styles.filter_selected
                                                            : ''
                                                    }
                                                >
                                                    {item.title}
                                                </span>
                                                <span>{item.count}</span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    );
                })}
            </div>
        </div>
    );
};

export default Filter;
