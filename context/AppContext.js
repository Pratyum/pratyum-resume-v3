'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
    const [view, setView] = useState('');

    useEffect(() => {
        if (window.matchMedia('(max-width: 1024px)').matches) {
            setView('mobile');
        } else if (window.matchMedia('(max-width: 2000px)').matches) {
            setView('desktop');
        } else {
            setView('largeDesktop');
        }

        window
            .matchMedia('(max-width: 1024px)')
            .addEventListener('change', (e) => {
                if (e.matches) {
                    setView('mobile');
                } else {
                    setView('desktop');
                }
            });

        window
            .matchMedia('(max-width: 2000px)')
            .addEventListener('change', (e) => {
                if (e.matches) {
                    setView('desktop');
                } else {
                    setView('largeDesktop');
                }
            });
    }, []);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [selectedFilter, setSelectedFilter] = useState('');

    const pathname = usePathname();
    const [isCaseDetailPage, setIsCaseDetailPage] = useState(false);
    const [caseId, setCaseId] = useState('');
    useEffect(() => {
        const pathParts = pathname.split('/');
        const caseIdFromPath = pathParts[2]; // cases/[caseId] -> index 2
        if (pathParts[1] === 'cases' && caseIdFromPath) {
            setIsCaseDetailPage(true);
            setCaseId(caseIdFromPath);
        } else {
            setIsCaseDetailPage(false);
            setCaseId('');
        }
    }, [pathname]);

    const [scrollDir, setScrollDir] = useState('');

    return (
        <AppContext.Provider
            value={{
                view,
                isMenuOpen,
                setIsMenuOpen,
                isFilterOpen,
                setIsFilterOpen,
                selectedFilter,
                setSelectedFilter,
                isCaseDetailPage,
                caseId,
                scrollDir,
                setScrollDir,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
