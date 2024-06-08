import { createClient } from 'contentful'
import Paragraph from '../components/Paragraph'

export async function getStaticProps( {locale} ) {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })



  const res = await client.getEntries({ 
    content_type: "mainPageParagraph", 
    locale
  })

  return {
    props: {
      paragraphs: res.items,
      locale,
    }
  }
}

export default function Home({paragraphs, locale}) {
  console.log(paragraphs)

  const sortedParagraphs = [...paragraphs];
  sortedParagraphs.sort((a, b) => {
    const titleA = parseInt(a.fields.title);
    const titleB = parseInt(b.fields.title);
    return titleA - titleB;
  });

  return (
    <div className="container">
      <h1>{locale === 'en' ? 'Philomena' : 'Філомена'}</h1>
      <main>
        <div className="paragraph-class">
        {sortedParagraphs.map(paragraph => (
          <Paragraph key={paragraph.sys.id} paragraph={paragraph}/>
        ))}

        </div>
      </main>

      <style jsx>{`
        .container h1{
          text-align: center;
        }
       
        
      `}</style>
    </div>
  )
}