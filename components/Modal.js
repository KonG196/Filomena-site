import React from 'react';

const Modal = ({ onClose, isModalOpen, locale }) => {
  const text = {
    en: {
      title: 'You can help us with these details:',
      receiver: 'Receiver',
      receiverValue: 'Charitable Foundation "GOD\'S CHILDREN"',
      iban: 'IBAN account',
      ibanValue: 'UA873257960000026007300539780',
      edrpou: 'EDRPOU Code',
      edrpouValue: '44817809',
      purpose: 'Payment purpose',
      purposeValue: 'Charitable donation',
      close: 'Close'
    },
    uk: {
      title: 'Ви можете допомогти нам за цими реквізитами:',
      receiver: 'Отримувач',
      receiverValue: 'БФ "БОЖІ ДІТИ"',
      iban: 'IBAN рахунок',
      ibanValue: 'UA873257960000026007300539780',
      edrpou: 'РНОКПП/ЄДРПОУ',
      edrpouValue: '44817809',
      purpose: 'Призначення платежу',
      purposeValue: 'Благодійний внесок',
      close: 'Закрити'
    }
  };

  const localeText = text[locale];

  return (
    <div className={`modalOverlay ${isModalOpen ? 'visible' : ''}`}>
      <div className={`modal ${isModalOpen ? 'visible' : ''}`}>
        <div className="modal-content">
          <h2>{localeText.title}</h2>
          <div className="donationInfo">
            <h3>{localeText.receiver}</h3>
            <p>{localeText.receiverValue}</p>
            <h3>{localeText.iban}</h3>
            <p>{localeText.ibanValue}</p>
            <h3>{localeText.edrpou}</h3>
            <p>{localeText.edrpouValue}</p>
            <h3>{localeText.purpose}</h3>
            <p>{localeText.purposeValue}</p>
          </div>
          <button onClick={onClose}>{localeText.close}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
