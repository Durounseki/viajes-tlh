import { useState, useEffect } from "react";
import styles from "../styles/ProgressiveImage.module.css";
import defaultImage from "../assets/viajeras-x-siempre-light.png";

const imageWidths = {
  small: 120,
  medium: 360,
  large: 720,
};

function ProgressiveImage({ srcKey, alt, className, sizes }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [srcKey]);

  if (!srcKey) {
    return (
      <img src={defaultImage} alt={alt} className={className} loading="lazy" />
    );
  }
  const placeholderSrc = `/api/images/${srcKey}?size=placeholder`;
  const srcSet = Object.entries(imageWidths)
    .map(([size, width]) => `/api/images/${srcKey}?size=${size} ${width}w`)
    .join(", ");

  const fallbackSrc = `/api/images/${srcKey}?size=small`;
  return (
    <div className={`${styles.container} ${className}`}>
      <img
        src={placeholderSrc}
        alt=""
        className={styles.placeholder}
        style={{ opacity: isLoaded ? 0 : 1 }}
        loading="eager"
      />
      <img
        src={fallbackSrc}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        className={styles.fullImage}
        style={{ opacity: isLoaded ? 1 : 0 }}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}

export default ProgressiveImage;
