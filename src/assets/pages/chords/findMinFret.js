

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
    while(serverMute > 0){
        if(serverMute % 2 === 1){
            mute.push(false);
        }else{
            mute.push(true);
        }
        serverMute = (serverMute - (serverMute % 2)) / 2;
    }
    while(mute.length < 6){
        mute.push(true);
    }
    return mute;
}