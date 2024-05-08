import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <div>
        <Link legacyBehavior href="/">
          <a>
            <img src="/logo.png" alt="Логотип" />
          </a>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link legacyBehavior href="/home">
              <a>Головна</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/news">
              <a>Новини</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/contacts" >
              <a>Контакти</a>
            </Link>
          </li>
        </ul>
      </nav>
      <div className='header-donate-block'>
        <Link legacyBehavior href="/">
          <a>
            Задонатити
          </a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
