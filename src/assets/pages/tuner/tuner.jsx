import MicAccess from './micAccess';
import { useState, useEffect, useRef} from 'react';
import './tuner.css';
import guitar from './guitar head.png';
import autoCorrelate from './AutoCorrelation.jsx';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyserNode = audioCtx.createAnalyser();
const buflen = 2048;
var buf = new Float32Array(buflen);


function Tuner() {
    const [activeIndex, setActiveIndex] = useState(0); // כפתור פעיל
    const activeIndexRef = useRef(activeIndex);
    useEffect(() => {
        activeIndexRef.current = activeIndex;
    }, [activeIndex]);
    const tune = [{note: 'E', frequency: 82.41}, {note: 'A', frequency: 110.00}, {note: 'D', frequency: 146.83}, {note: 'G', frequency: 196.00}, {note: 'B', frequency: 246.94}, {note: 'E', frequency: 329.63}];

    const [source, setSource] = useState(null);
    const [started, setStart] = useState(false);

    const [pitchScale, setPitchScale] = useState("4");
    const [pitch, setPitch] = useState("0");
    const [cents, setCents] = useState(null);
    const pitchRef =  useRef(pitch);
    const centsRef = useRef(cents);
    const pitchScaleRef = useRef(pitchScale);

    const [notes, setNotes] = useState([]);


    const updatePitch = () => {
        console.log('updatePitch called');
        analyserNode.getFloatTimeDomainData(buf);
        var ac = autoCorrelate(buf, audioCtx.sampleRate);
        centsRef.current = null;
        if (ac > -1) {
            pitchRef.current = parseFloat(ac).toFixed(2);
            pitchScaleRef.current = Math.floor(noteFromPitch(ac) / 12) - 1;
            centsRef.current = getTuningAccuracy(ac, tune[activeIndexRef.current].frequency).toFixed(2);
            console.log(activeIndexRef.current);
            setPitch(pitchRef.current);
            setPitchScale(pitchScaleRef.current);
            setCents(centsRef.current);
            console.log('cents', centsRef.current,'pitch', pitchRef.current,'pitchScale', pitchScaleRef.current);
        }
        setNotes(prev => [centsRef.current, ...prev.slice(0, 50)]); // שמור עד 50 אחרונים
    };



    useEffect(() => {
        if (source != null) {
        source.connect(analyserNode);
        }
    }, [source]);

    useEffect(() => {
        if (!started) return;

        const interval = setInterval(updatePitch, 100);
        return () => clearInterval(interval);
    }, [started]);

    const start = async () => {
        const input = await getMicInput();

        if (audioCtx.state === "suspended") {
            await audioCtx.resume();
        }
        setStart(true);
        setSource(audioCtx.createMediaStreamSource(input));
    };

    const stop = () => {
        source.disconnect(analyserNode);
        setStart(false);
    };

    const getMicInput = () => {
        return navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                autoGainControl: false,
                noiseSuppression: false,
                latency: 0,
            },
        });
    };

    const handleButtonClick = (index) => {
        setActiveIndex(index);
    };
    // מערך של תווים אחרונים

    function getTuningAccuracy(actualFreq, targetFreq) {
        // מרחק בפנטים בין התדר בפועל לבין התדר הנכון
        //100 cent = חצי טון
        const cents = 1200 * Math.log2(actualFreq / targetFreq);
        return cents;
    }
    const noteFromPitch = (frequency) => {
        var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
        return Math.round(noteNum) + 69;
    };


    return (
        <div className ="tuner-page">
            <h1>Tuner Page</h1>
            <p>This is the Tuner page content.</p>
            {!started ? (
                <button className="button" onClick={start}>Start</button>
            ) : (
                <button className="button" onClick={stop}>Stop</button>
            )}
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
                    {notes.map((note, index) => {
                        if (note === null) {
                            return null;
                        }
                        if (note > -10 && note < 10) {
                            return (
                                <rect
                                    key={index}
                                    x={index * 4 + 15}
                                    y={73 + (note * 1.5)}
                                    width={5}
                                    height={4}
                                    fill="green"
                                />
                            );
                        } else if ((note > -20 && note <= -10) || (note >= 10 && note < 20)) {
                            return (
                                <Cursor
                                    x ={index * 4 + 15}
                                    y={note > 0 ? 73 + (note * 1.5) : 73 + (note * 1.5)}
                                    color="yellow"
                                    key={index}
                                />
                            );
                        }else if ((note > -50 && note <= -20) || (note >= 20 && note < 50)) {
                            return (
                                <Cursor
                                    x ={index * 4 + 15}
                                    y={note > 0 ? 73 + (note * 1.5) : 73 + (note * 1.5)}
                                    color="orange"
                                    key={index}
                                />
                            );
                        } else if (note <= -50 || note >= 50) {
                            return (
                                <Cursor
                                    x ={index * 4 + 15}
                                    y={note <= -50 ? 0 : 146}
                                    color="red"
                                    key={index}
                                />
                            );
                        }
                    })}
                </svg>
            </div>
        </div>
    );
}

const Cursor = ({ x, y, color}) => (
  <rect x={x} y={y} width={5} height={4} fill={color}/>
);

export default Tuner;