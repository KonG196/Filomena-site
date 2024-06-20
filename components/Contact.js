import React from 'react';

export default function Contact({ contact, locale }) {
  const { phoneNumber, code, fullName, address, foundationDate, ceo, email } = contact.fields;

  return (
    <div className="contact">
      <div>
        <h3>{locale === 'en' ? 'Our Charitable Organization' : "Наша Організація"}:</h3>
        <p>{fullName}</p>
      </div>
      <div>
        <h3>{locale === 'en' ? 'EDRPOU Code' : "Код ЄДРПОУ"}:</h3>
        <p>{code}</p>
      </div>
      <div>
        <h3>{locale === 'en' ? 'Address' : "Адреса"}:</h3>
        <p>{address}</p>
      </div>
      <div>
        <h3>{locale === 'en' ? 'Phone' : "Телефон"}:</h3>
        <p>{phoneNumber}</p>
      </div>
      <div>
        <h3>{locale === 'en' ? 'Foundation Date' : "Дата заснування"}:</h3>
        <p>{foundationDate}</p>
      </div>
      <div>
        <h3>{locale === 'en' ? 'CEO' : "Директор"}:</h3>
        <p>{ceo}</p>
      </div>
      <div>
        <h3>{locale === 'en' ? 'Email' : "Пошта"}:</h3>
        <p>{email}</p>
      </div>
      <style jsx>{`
.contact{
  font-size: 18px;
  border: 4px solid #2e2a1e;
  padding: 40px;
  border-radius: 15px;
}
@media only screen and (max-width: 768px) {
  .contact{
    font-size: 16px;
    padding: 20px
  }
  .contact p{
    font-size: 14px;
  }
}

`}</style>
    </div>
    
  );
}



