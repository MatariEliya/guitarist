import MicAccess from './micAccess';
import { useState, useEffect } from 'react';
import './tuner.css';
import guitar from './guitar head.png';

function Tuner() {
    const [childListening, setChildListening] = useState(false); // מצב המאזין
    const [activeIndex, setActiveIndex] = useState(0); // כפתור פעיל
    const tune = [{note: 'E', frequency: 82.41}, {note: 'A', frequency: 110.00}, {note: 'D', frequency: 146.83}, {note: 'G', frequency: 196.00}, {note: 'B', frequency: 246.94}, {note: 'E', frequency: 329.63}];
    const [notePlaying, setNotePlaying] = useState(246.94);
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        if (!childListening) return;

        const interval = setInterval(() => {
            update();
        }, 500);

        return () => clearInterval(interval);
    }, [childListening]);

    const handleData = (value) => {
        setNotePlaying(value);
        console.log('Detected pitch:', value);
    };

    const handleButtonClick = (index) => {
        setActiveIndex(index);
    };
    // מערך של תווים אחרונים
    const update = () => {
        console.log('notePlaying:', notePlaying);
        if (!notePlaying) return;

        const cents = getTuningAccuracy(notePlaying, tune[activeIndex].frequency);
        console.log('cents:', cents);
        setNotes(prev => [cents, ...prev.slice(0, 50)]); // שמור עד 50 אחרונים
    };

    function getTuningAccuracy(actualFreq, targetFreq) {
        // מרחק בפנטים בין התדר בפועל לבין התדר הנכון
        //100 cent = חצי טון
        const cents = 1200 * Math.log2(actualFreq / targetFreq);
        return cents;
    }

    return (
        <div className ="tuner-page">
            <h1>Tuner Page</h1>
            <p>This is the Tuner page content.</p>
            <MicAccess 
                onData={handleData} 
                onListeningChange={setChildListening} 
            />
            <div className="tuner-display">
                <img src={guitar} alt="Guitar Head" className="guitar-image" />
                {tune.map((note, index) => (
                    <button
                        key={index}
                        className={`tune-button tune-button-${index} ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => handleButtonClick(index)}
                    >
                        {note.note}
                    </button>

                ))}
                <svg className="tuner-svg" viewBox="0 0 100 150">
                    {notes.map((note, index) => (
                        <rect
                            key={index}
                            x={index * 15 + 10}
                            y={100 - note * 10}
                            width={10}
                            height={note * 10}
                            fill="green"
                        />
                    ))}
                </svg>
            </div>
        </div>
    );
}

export default Tuner;
