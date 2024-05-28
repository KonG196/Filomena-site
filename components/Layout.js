import { useEffect } from 'react';
import Header from './Header';

export default function Layout({ children, locale }) {
  useEffect(() => {
    const headerIcon = document.getElementById('header__icon');
    const siteCache = document.getElementById('site-cache');
    const body = document.body;

    const toggleSidebar = (e) => {
      e.preventDefault();
      body.classList.toggle('with--sidebar');
    };

    const removeSidebar = () => {
      body.classList.remove('with--sidebar');
    };

    const sidebarLinks = document.querySelectorAll('.menu a');

    sidebarLinks.forEach(link => {
      link.addEventListener('click', () => {
        removeSidebar();
      });
    });

    if (headerIcon) {
      headerIcon.addEventListener('click', toggleSidebar);
    }

    if (siteCache) {
      siteCache.addEventListener('click', removeSidebar);
    }

    return () => {
      if (headerIcon) {
        headerIcon.removeEventListener('click', toggleSidebar);
      }

      if (siteCache) {
        siteCache.removeEventListener('click', removeSidebar);
      }
    };
  }, []);

  const getFooterText = (locale) => {
    switch (locale) {
      case 'en':
        return 'Konyovsky Ihor, Public Organization "Filomena". All rights reserved.';
      case 'uk':
        return 'Коньовський Ігор, Громадська організація "Філомена". Усі права захищено.';
      default:
        return '';
    }
  };

  const footerText = getFooterText(locale);

  return (
    <div className="layout">
      <div className="layout_pusher">
        <Header />
        <div className="page-content">
          {children}
        </div>
        <div className="site-cache" id="site-cache"></div>
        <footer>
          <p>{footerText}</p>
        </footer>
      </div>
    </div>
  );
}
