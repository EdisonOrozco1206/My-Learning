'use client'

import React, { useRef, useEffect } from 'react';

const Carousel = () => {
    const slidesContainerRef = useRef(null);
    const slideRef = useRef(null);
    var counter = 0;

    const handleNext = () => {
        const slideWidth = slideRef.current.clientWidth;

        if(counter == 2){
            slidesContainerRef.current.scrollLeft = 0;
            counter = 0;
        } else {
            slidesContainerRef.current.scrollLeft += slideWidth;
            counter +=1
        }
    };

    const handlePrev = () => {
        const slideWidth = slideRef.current.clientWidth;
        slidesContainerRef.current.scrollLeft -= slideWidth;
    };

    useEffect(() => {
        const intervalID = setInterval(handleNext, 5000);
        return () => clearInterval(intervalID);
    }, []);

    return (
        <div className="carousel mt-10 w-4/5 mx-auto relative bg-slate-300 max-h-[73vh] overflow-y-hidden">
            <section className="slider-wrapper">
                <button className="slide-arrow absolute top-[50%] text-7xl bg-white border rounded-full hover:bg-slate-200 transition-all ml-2" onClick={handlePrev}>
                    <p className="h-14 w-14 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-badge-left-filled" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M17 6h-6a1 1 0 0 0 -.78 .375l-4 5a1 1 0 0 0 0 1.25l4 5a1 1 0 0 0 .78 .375h6l.112 -.006a1 1 0 0 0 .669 -1.619l-3.501 -4.375l3.5 -4.375a1 1 0 0 0 -.78 -1.625z" strokeWidth="0" fill="currentColor" />
                        </svg>
                    </p>
                </button>
                
                <button className="slide-arrow absolute top-[50%] right-0 text-7xl bg-white border rounded-full hover:bg-slate-200 transition-all mr-2" onClick={handleNext}>
                    <p className='h-14 w-14 flex items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-badge-right-filled" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M7 6l-.112 .006a1 1 0 0 0 -.669 1.619l3.501 4.375l-3.5 4.375a1 1 0 0 0 .78 1.625h6a1 1 0 0 0 .78 -.375l4 -5a1 1 0 0 0 0 -1.25l-4 -5a1 1 0 0 0 -.78 -.375h-6z" strokeWidth="0" fill="currentColor" />
                        </svg>
                    </p>
                </button>
                
                <ul className="slides-container overflow-y-hidden max-h-[85vh] flex flex-row" ref={slidesContainerRef}>
                    <li className="slide min-w-full" ref={slideRef}>
                        <img src="images/banner/banner-1.webp" alt="" className='min-w-full' />
                    </li>
                    <li className="slide min-w-full" ref={slideRef}>
                        <img src="images/banner/banner-2.jpg" alt="" className='min-w-full' />
                    </li>
                    <li className="slide min-w-full" ref={slideRef}>
                        <img src="images/banner/banner-3.jpg" alt="" className='min-w-full' />
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default Carousel;