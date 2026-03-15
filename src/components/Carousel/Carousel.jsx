import React from "react";
import { useState } from "react";
import './Carousel.css';

function Carousel({ children, className, style}) {
    const images = React.Children.toArray(children);
    const [index, setIndex] = useState(0);

    const prev = () => setIndex(index === 0 ? images.length - 1 : index - 1);
    const next = () => setIndex(index === images.length - 1 ? 0 : index + 1);
    if (index >= images.length) {
        setIndex(0);
    }
    return (
        images.length === 0 ? null :
            <div className={`carousel ${className}`} style={style}>
                {children[index]}
                <button className="carousel-button prev" onClick={prev}>
                    <svg
                        viewBox="0 0 4 24"
                        fill="none"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"

                    >
                        <polyline points="3,19 1,12 3,5" stroke="rgba(0, 0, 0, 0.50)" strokeWidth="1" fill="none"/>
                    </svg>
                </button>
                <button className="carousel-button next" onClick={next}>
                    <svg
                        viewBox="0 0 4 24"
                        fill="none"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="1,19 3,12 1,5" stroke="rgba(0, 0, 0, 0.50)" strokeWidth="1" fill="none"/>
                    </svg>
                </button>

                
            </div>
        
    );
}

export default Carousel;