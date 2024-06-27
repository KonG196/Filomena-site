import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/slug.module.css'
import { useRouter } from 'next/router'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'recipe',
  })

  const paths = res.items.flatMap((item) =>
    ['en', 'uk'].map((locale) => ({
      params: { slug: item.fields.slug },
      locale,
    }))
  )

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params, locale }) => {
  let { items } = await client.getEntries({
    content_type: 'recipe',
    'fields.slug': params.slug,
    locale,
  })

  // If no items found for the requested locale, fall back to Ukrainian locale
  if (!items.length) {
    const fallback = await client.getEntries({
      content_type: 'recipe',
      'fields.slug': params.slug,
      locale: 'uk',
    })
    items = fallback.items
  }

  const recipe = items[0];

  // Check if the thumbnail is available
  if (!recipe.fields.thumbnail || !recipe.fields.thumbnail.fields.file) {
    // Fallback to Ukrainian locale thumbnail
    const fallback = await client.getEntries({
      content_type: 'recipe',
      'fields.slug': params.slug,
      locale: 'uk',
    })
    if (fallback.items.length) {
      recipe.fields.thumbnail = fallback.items[0].fields.thumbnail
    }
  }

  return {
    props: { recipe },
  }
}

export default function RecipeDetails({ recipe }) {
  const router = useRouter();
  const { locale } = router;

  const { thumbnail, title, shortDescr, method, date, media, video1, video2, video3 } = recipe.fields

  if (!thumbnail || !thumbnail.fields || !thumbnail.fields.file || !thumbnail.fields.file.details) {
    console.error('Image data is not available', recipe)
    return <p>Image data is not available</p>
  }

  const imageUrl = thumbnail.fields.file.url || ''
  const imageAlt = thumbnail.fields.title || 'Recipe Image'

  let { width, height } = thumbnail.fields.file.details.image
  if (width > 900 && width < 1400) {
    width /= 2
    height /= 2
  } else if (width > 1400) {
    width /= 3
    height /= 3
  }

  console.log('Recipe:', recipe)
  console.log('Video1:', video1)

  const videoHtml1 = video1 && typeof video1 === 'object' && video1.content
    ? video1.content[0].content[0].value
    : '';
    const videoHtml2 = video2 && typeof video2 === 'object' && video2.content
    ? video2.content[0].content[0].value
    : '';
    const videoHtml3 = video3 && typeof video3 === 'object' && video3.content
    ? video3.content[0].content[0].value
    : '';


  return (
    <div className={styles.content_block}>
      <div className={styles.banner}>
        <div className={styles.container}>
          <Link legacyBehavior href="/news">
            <a>
              <img src={'/arrow.png'} alt="Back to news" className={styles.arrow} />
            </a>
          </Link>
          <div className={styles.image}>
            <Image
              src={'https:' + imageUrl}
              width={width}
              height={height}
              alt={imageAlt}
              priority
            />
          </div>
        </div>
      </div>

      <div className={styles.method}>
        <div className={styles.news_descr}>
          <h1>{title}</h1>
          <h4 className={styles.date}>{date}</h4>
          {documentToReactComponents(method)}
        </div>
      </div>
      <h2>
        Фото
      </h2>
      {media && media.length > 0 && (
        <div className={styles.mediaGallery}>
          {media.map((item, index) => {
            const { file, title } = item.fields;
            const mimeType = file.contentType;
            
            return (
              <div key={index} className={styles.mediaItem}>
                {mimeType.startsWith('image/') && (
                  <Image
                    src={`https:${file.url}`}
                    width={file.details.image.width}
                    height={file.details.image.height}
                    alt={title || 'Media Item'}
                  />
                )}   
              </div>
            );
          })}
        </div>
      )}
      <h2>
        Відео
      </h2>

      {videoHtml1 && (
        <div className={styles.videoContainer}>
          <div className={styles.videoWrapper} dangerouslySetInnerHTML={{ __html: videoHtml1 }} />
        </div>
      )}
      {videoHtml2 && (
        <div className={styles.videoContainer}>
          <div className={styles.videoWrapper} dangerouslySetInnerHTML={{ __html: videoHtml2 }} />
        </div>
      )}
      {videoHtml3 && (
        <div className={styles.videoContainer}>
          <div className={styles.videoWrapper} dangerouslySetInnerHTML={{ __html: videoHtml3 }} />
        </div>
      )}
    </div>
  )
}
