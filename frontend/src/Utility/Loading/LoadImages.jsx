
import { useState } from "react";

function LoadImages({ images }) {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    for (let i = 0; i < images.length; i++) {
        const img = new Image();
        img.src = images[i];
        img.onload = () => {
            console.log(img, "loaded")
        }
    }
    setImagesLoaded(true);
    return imagesLoaded;
}

export default LoadImages