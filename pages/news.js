import { createClient } from 'contentful'
import NewsCard from '../components/NewsCard'

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: "recipe" })

  return {
    props: {
      recipes: res.items,
    }
  }
}

export default function News({ recipes }) {
  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <NewsCard key={recipe.sys.id} recipe={recipe}/>
      ))}
      <style jsx>{`
        .recipe-list {
          display: flex;
          grid-gap: 20px 100px;
          flex-wrap: wrap;
          align-items: center;
        }
      `}</style>
    </div>
  )
}
