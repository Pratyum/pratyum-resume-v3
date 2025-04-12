import React from 'react';
import Filter from '../../components/Filter';

const Test = () => {
    return (
        <div
            style={{
                backgroundColor: 'lightgreen',
                width: '100vw',
                height: '200vh',
            }}
        >
            <div
                style={{
                    position: 'relative',
                    top: 0,
                    left: '50%',
                    translate: '-50% 0',
                    width: '65vw',
                }}
            >
                <Filter />
            </div>
        </div>
    );
};

export default Test;
