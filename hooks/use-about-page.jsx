'use client';
import { aboutData } from "@/assets/data/about-data";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

export const useAboutPage = () => {
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


    return {
        sectionOneImages,
        sectionFiveData,
        sectionSixData,
        sec1ScrollPercent,
        sec3ScrollPercent,
        section1Ref,
        section2Ref,
        section3Ref,
        inView,
        sec1Height
    }

}