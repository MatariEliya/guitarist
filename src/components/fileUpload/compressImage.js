export function compressImage(file, newWidth = 300, newHeight = 300) {
    return new Promise((resolve) => {
        const image = new Image();
        const url = URL.createObjectURL(file);
        image.src = url;

        image.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext("2d");

            const targetAspect = newWidth / newHeight
            const imgAspect = image.width / image.height

            let sx, sy, sWidth, sHeight;

            if (imgAspect > targetAspect) {
                // התמונה רחבה מדי – חותכים מהצדדים
                sHeight = image.height;
                sWidth = sHeight * targetAspect;
                sx = (image.width - sWidth) / 2;
                sy = 0;
            } else {
                // התמונה גבוהה מדי – חותכים מלמעלה/למטה
                sWidth = image.width;
                sHeight = sWidth / targetAspect;
                sx = 0;
                sy = (image.height - sHeight) / 2;
            }
            

            ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, newWidth, newHeight);

            canvas.toBlob((blob) => {
                URL.revokeObjectURL(url);
                resolve(blob);
            }, "image/webp", 0.8);
        };
    });
}
