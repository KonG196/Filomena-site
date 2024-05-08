import { createClient } from 'contentful'
import RecipeCard from '../components/RecipeCard'
import Paragraph from '../components/Paragraph'



export async function getStaticProps() {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: "mainPageParagraph" })

  return {
    props: {
      paragraphs: res.items,
    }
  }
}

export default function Home({paragraphs}) {
  console.log(paragraphs)

  const sortedParagraphs = [...paragraphs];
  sortedParagraphs.sort((a, b) => {
    const titleA = parseInt(a.fields.title);
    const titleB = parseInt(b.fields.title);
    return titleA - titleB;
  });

  return (
    <div className="container">

      <main>
        <div className="paragraph-class">

        {sortedParagraphs.map(paragraph => (
          <Paragraph key={paragraph.sys.id} paragraph={paragraph}/>
        ))}

        </div>
      </main>

      <style jsx>{`
        @media (max-width: 430px) {
          
        }
        
      `}</style>
    </div>
  )
}