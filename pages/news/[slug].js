import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/slug.module.css';


const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "recipe"
  })

  const paths = res.items.map(item => {
    return {
      params: { slug: item.fields.slug }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: 'recipe',
    'fields.slug': params.slug
  })

  return {
    props: { recipe: items[0] }
  }

}

export default function RecipeDetails({ recipe }) {
  const { thumbnail, title, shortDescr, method } = recipe.fields;
  console.log(recipe);

  let { width, height } = thumbnail.fields.file.details.image;
  if (width > 900 && width < 1400) {
    width /= 2;
    height /= 2;
  } else if (width > 1400) {
    width /= 3;
    height /= 3;
  }

  return (
    <div className={styles.content_block}>
      <div className={styles.banner}>
        

        <div className={styles.container}>
        <Link legacyBehavior href="/news">
          <a>
            <img src={'/arrow.png'} alt="" className={styles.arrow}/>
          </a>
        </Link>
          <div className={styles.image}>
            <Image
              src={'https:' + thumbnail.fields.file.url}
              width={width}
              height={height}
              style={{}}
            />
            <h2>{title}</h2>
          </div>
          <div className={styles.title}>

          </div>
        </div>


      </div>

      <div className={styles.method}>
        <div className={styles.news_descr}>{documentToReactComponents(method)}</div>
      </div>

    </div>
  )
}
