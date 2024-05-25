import { useEffect } from 'react';
import Header from './Header';

export default function Layout({ children }) {
  useEffect(() => {
    const headerIcon = document.getElementById('header__icon');
    const siteCache = document.getElementById('site-cache');
    const body = document.body;

    const toggleSidebar = (e) => {
      e.preventDefault();
      body.classList.toggle('with--sidebar');

    };

    document.addEventListener('DOMContentLoaded', function() {
      const sidebarLinks = document.querySelectorAll('.menu a');
    
      sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
          body.classList.remove('with--sidebar');
        });
      });
    });

    const removeSidebar = () => {
      body.classList.remove('with--sidebar');
 
    };

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

  return (
    <div className="layout">
      <div className="layout_pusher">
        <Header />
        <div className="page-content">
          {children}
        </div>
        <div className="site-cache" id="site-cache"></div>
        <footer>
          <p>Коньовський Ігор, Громадська організація "Філомена". Усі права захищено.</p>
        </footer>
      </div>
    </div>
  );
}
