import React, { useState } from 'react';
import Link from 'next/link';
import Modal from './Modal';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="header">
      <a href="#" className="header__icon" id="header__icon"></a>
      <div className='logo'>
        <Link legacyBehavior href="/home">
          <a className="img_link">
            <img src="/logo2.png" alt="Логотип" />
          </a>
        </Link>
      </div>
      <nav className="menu">
        <a href="" className='header-text-mobile'>Філомена</a>
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
            <Link legacyBehavior href="/contacts">
              <a>Контакти</a>
            </Link>
          </li>
         
        </ul>
      </nav>

      <div className="header-donate-block">
              <button onClick={openModal}>
                <a>Задонатити</a>
              </button>
            </div>
      
      <Modal onClose={closeModal} isModalOpen={isModalOpen} />
    </header>
  );
};

export default Header;
