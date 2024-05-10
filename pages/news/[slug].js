import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'
import Link from 'next/link'


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
  const {thumbnail, title, shortDescr, method } = recipe.fields
  console.log(recipe)

  let { width, height } = thumbnail.fields.file.details.image;
  if (width > 900 & width < 1400) {
      width /= 2;
      height /= 2;
  }else if(width > 1400){
      width /=3 ;
      height /=3 ;
  }

  return (
    <div>
      <div className="banner">
        <Link legacyBehavior href="/news">
          <a>
            <Image src={'/arrow.png'}
            width={45}
            height={45}
            style={{ position:'absolute',marginLeft:'-150px' }}
            />
          </a>
        </Link>
        <Image 
          src={'https:' + thumbnail.fields.file.url}
          width={width}
          height={height}
          style={{ borderRadius: '15px', overflow: 'hidden', border: '4px solid #2e2a1e'}}
        />
        <h2>{ title }</h2>
      </div>
        
      <div className="method">
        <div>{documentToReactComponents(method)}</div>
      </div>

      <style jsx>{`
        h2,h3 {
          text-transform: uppercase;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -60px;
          left: -10px;
          transform: rotateZ(-1deg);
          border-radius: 15px;
          box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  )
}