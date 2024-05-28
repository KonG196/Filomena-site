import React, { useState } from 'react';
import Link from 'next/link';
import Modal from './Modal';
import { useRouter } from 'next/router';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { locale, locales, asPath } = useRouter();
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const headerText = {
    en: {
      home: 'Home',
      news: 'News',
      contacts: 'Contacts',
      donate: 'Donate'
    },
    uk: {
      home: 'Головна',
      news: 'Новини',
      contacts: 'Контакти',
      donate: 'Задонатити'
    }
  };

  return (
    <header className="header">
      <div className="language-switcher">
        {locales.map((loc) => (
          <Link legacyBehavior key={loc} href={asPath} locale={loc}>
            <a className={locale === loc ? 'active' : ''}>{loc.toUpperCase()}</a>
          </Link>
        ))}
      </div>
      <a href="#" className="header__icon" id="header__icon"></a>
      <div className={`logo ${locale === 'uk' ? 'uk-logo' : ''}`}>
        <Link legacyBehavior href="/home">
          <a className="img_link">
            <img src="/logo2.png" alt="Логотип" />
          </a>
        </Link>
      </div>
      <nav className={`menu ${locale === 'en' ? 'english-locale' : ''}`}>
        <a href="" className='header-text-mobile'>{headerText[locale].home}</a>
        <ul>
          <li>
            <Link legacyBehavior href="/home">
              <a>{headerText[locale].home}</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/news">
              <a>{headerText[locale].news}</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/contacts">
              <a>{headerText[locale].contacts}</a>
            </Link>
          </li>

          <div className="language-switcher-mobile">
            {locales.map((loc) => (
              <Link legacyBehavior key={loc} href={asPath} locale={loc}>
                <a className={locale === loc ? 'active' : ''}>{loc.toUpperCase()}</a>
              </Link>
            ))}
          </div>
        </ul>
      </nav>

      <div className="header-donate-block">
        <button onClick={openModal}>
          <a>{headerText[locale].donate}</a>
        </button>
      </div>

      <Modal onClose={closeModal} isModalOpen={isModalOpen} locale={locale} />
      
      {/* CSS styles */}
      <style jsx>{`
        .menu {
          margin-left: -10px;
        }
        .english-locale .menu {
          margin-left: 0;
        }

        @media (max-width: 768px) {
          .logo {
            margin-left: 0; /* зсув логотипу вліво на мобільних пристроях */
          }

          .uk-logo {
            margin-left: 35px; /* зміна зсуву лого для мобільних пристроях */
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
