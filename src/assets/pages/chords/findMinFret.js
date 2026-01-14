// This function finds the minimum fret positions for a given chord


export function findMinFret(chord) {
    let frets = [true, true, true, true, true, true];

    for (let finger of chord.fingers) {
        if (finger[0] !== 0) {
            frets[finger[1] - 1] = false;
            for (let i = 0; i < finger[2]; i++) {
                frets[finger[1] + i] = false;
            }
        }
    }

    for (let mute of chord.mute) {
        frets[mute - 1] = false;
    }

    return frets;
}