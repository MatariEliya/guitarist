

export function findMinFret(chord) {
    let frets = [...chord.mute];
    for (let finger of chord.fingers) {
        if (finger.isExist && finger?.fret > 0) {
            frets[finger.string - 1] = false;
            for (let i = 0; i < finger.barre; i++) {
                frets[finger.string + i] = false;
            }
        }
    }

    return frets;
}

export function openMute(serverMute) {
    let mute = [];
    if(serverMute > 63 || serverMute < 0){
        return mute;
    }
    for(let i = 0; i < 6; i++){
        mute.push((serverMute & Math.pow(2, i)) == 0);
    }
    return mute;
}