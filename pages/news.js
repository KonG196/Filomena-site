import { createClient } from 'contentful';
import NewsCard from '../components/NewsCard';

export async function getStaticProps({ locale }) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  // Запит для отримання рецептів
  const res = await client.getEntries({
    content_type: 'recipe',
    locale,
  });

  // Запит для отримання українських зображень
  const resUkr = await client.getEntries({
    content_type: 'recipe',
    locale: 'uk',
  });

  // Створення мапи з українськими зображеннями
  const ukrainianImagesMap = resUkr.items.reduce((map, item) => {
    map[item.fields.slug] = item.fields.thumbnail;
    return map;
  }, {});

  // Заміна зображень в рецептах на українські
  const recipes = res.items.map(item => {
    item.fields.thumbnail = ukrainianImagesMap[item.fields.slug];
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
