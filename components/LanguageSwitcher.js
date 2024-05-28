import Link from 'next/link';
import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
  const { locale, locales, asPath } = useRouter();

  return (
    <div>
      {locales.map((loc) => (
        <Link key={loc} href={asPath} locale={loc}>
          <a style={{ margin: 10, textDecoration: locale === loc ? 'underline' : 'none' }}>
            {loc.toUpperCase()}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
