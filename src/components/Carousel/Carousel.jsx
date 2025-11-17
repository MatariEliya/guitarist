import React from "react";
import { useState } from "react";
import './Carousel.css';

function Carousel({ children, className, style}) {
    const images = React.Children.toArray(children);
    const [index, setIndex] = useState(0);

    const prev = () => setIndex(index === 0 ? images.length - 1 : index - 1);
    const next = () => setIndex(index === images.length - 1 ? 0 : index + 1);
    return (
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
            {images.length > 1 && images.length > 10? 
                <div className="carousel-dots">
                    <span key={0} className={`dot active`}
                        onClick={() => setIndex(0)}
                    ></span>
                    {index > 7? <svg viewBox="0 0 6 16" fill="none">
                        <circle cx="3" cy="8" r="2" fill="rgba(0, 0, 0, 0.50)"/>
                    </svg> : null}
                </div>
                :<div className="carousel-dots">
                    {images.map((_, i) => (
                        <span key={i} className={`dot ${i === index ? "active" : ""}` }
                        onClick={() => setIndex(i)}
                        ></span>
                    ))}


                </div>
            }
            
        </div>
    );
}

export default Carousel;