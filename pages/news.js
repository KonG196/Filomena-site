import { createClient } from 'contentful';
import NewsCard from '../components/NewsCard';

export async function getStaticProps({ locale }) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({
    content_type: "recipe",
    locale
  });

  // Перевіряємо, чи відображається українська версія
  const recipes = res.items.map(item => {
    // Якщо для поточного рецепту не вказано зображення, але є українське, замінюємо англійське зображення на українське
    if (!item.fields.thumbnail && item.fields.thumbnailUkr) {
      item.fields.thumbnail = item.fields.thumbnailUkr;
    }
    return item;
  });

  return {
    props: {
      recipes,
      locale,
    },
  };
}

export default function News({ recipes, locale }) {
  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <NewsCard key={recipe.sys.id} recipe={recipe} locale={locale} />
      ))}
      <style jsx>{`
        .recipe-list {
          justify-content: center;
          display: flex;
          grid-gap: 20px 100px;
          flex-wrap: wrap;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
