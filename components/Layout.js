import Link from 'next/link';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header/>
      <div className="page-content">
        {children}
      </div>
      <footer>
        <p>Коньовський Ігор, Громадська організація "Філомена". Усі права захищено. </p>
      </footer>

      <style jsx>{`
      `}</style>
    </div>
  );
}
