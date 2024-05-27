import React, { useState, useEffect } from 'react';
import styles from '../styles/news-card.module.css';
import Link from 'next/link';
export default function NewsCard({ recipe }) {
  const { title, slug, thumbnail, shortDescr, date } = recipe.fields;
  const [cardWidth, setCardWidth] = useState(360);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Встановлюємо початкову ширину картки відповідно до співвідношення зображення
    const { width, height } = thumbnail.fields.file.details.image;
    const aspectRatio = width / height;
    setCardWidth(Math.min(400, aspectRatio * 500)); // Максимум 400px ширина

    // Підписка на подію завантаження зображення
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = thumbnail.fields.file.url;
  }, [thumbnail]);

  return (
    <div className={styles.card} style={{ width: `${cardWidth}px` }}>
      <figure className={`${styles.snip1369} //${styles.hover}`}>
        
        <img
          src={'https:' + thumbnail.fields.file.url}
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? 'block' : 'none' }}
          alt="Thumbnail"
        />
        <figcaption>
          <h3>{title}</h3>
          <p>{shortDescr + "вау вау вау вау просто вау вау вау"}</p>
          <h5>{date}</h5>
        </figcaption>
        <span className={styles.readMore}>
          Читати далі <i className={styles.arrow}>→</i>
        </span>
        <a href={'/news/' + slug}></a>

        <div className={styles.image}>
          <img
            src={'https:' + thumbnail.fields.file.url}
            onLoad={() => setImageLoaded(true)}
            style={{ display: imageLoaded ? 'block' : 'none' }}
            alt="Thumbnail"
          />

        </div>

      </figure>
    </div>
  );
}
