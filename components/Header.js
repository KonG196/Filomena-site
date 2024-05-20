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
    <header>
      <div>
        <Link legacyBehavior href="/home">
          <a className='img_link'>
            <img src="/logo2.png" alt="Логотип" />
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
