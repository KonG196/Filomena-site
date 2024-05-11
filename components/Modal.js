import React from 'react';

const Modal = ({ onClose, isModalOpen }) => {
  return (
    <div className={`modalOverlay ${isModalOpen ? 'visible' : ''}`}>
      <div className={`modal ${isModalOpen ? 'visible' : ''}`}>
        <div className="modal-content">
          <h2>Ви можете допомогти нам за цими реквізитами:</h2>
          <div className="donationInfo">
            <h3>Отримувач</h3>
            <p>КОНЬОВСЬКИЙ ІГОР МИРОНОВИЧ</p>
            <h3>IBAN рахунок</h3>
            <p>UA873257960000026007300539780</p>
            <h3>РНОКПП/ЄДРПОУ</h3>
            <p>44817809</p>
            <h3>Призначення платежу</h3>
            <p>Поповнення рахунку, КОНЬОВСЬКИЙ ІГОР МИРОНОВИЧ</p>
          </div>
          <button onClick={onClose}>Закрити</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
