import { createClient } from 'contentful'
import Contact from '../components/Contact'
import { useRouter } from 'next/router';

export async function getStaticProps({ locale }) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ 
    content_type: "contactsPage",
    locale 
  })

  return {
    props: {
      contacts: res.items,
      locale, 
    }
  }
}

export default function Contacts({ contacts, locale }) {
  console.log(contacts);
  return (
    <div className="contacts-list">
      <h1>{locale === 'en' ? 'Contacts' : 'Контакти'}</h1>
      
      <div className='contacts'>
        {contacts.map(contact => (
          <Contact key={contact.sys.id} contact={contact} locale={locale} />
        ))}
      </div>

      <div className="contactsDonationInfo">
        <h3>{locale === 'en' ? 'Recipient' : 'Отримувач'}</h3>
        <p>{locale === 'en' ? 'KONYOVSKY IGOR MYRONOVYCH' : 'КОНЬОВСЬКИЙ ІГОР МИРОНОВИЧ'}</p>
        <h3>{locale === 'en' ? 'IBAN Account' : 'IBAN рахунок'}</h3>
        <p>UA873257960000026007300539780</p>
        <h3>{locale === 'en' ? ' EDRPOU Code' : 'РНОКПП/ЄДРПОУ'}</h3>
        <p>44817809</p>
        <h3>{locale === 'en' ? 'Payment Purpose' : 'Призначення платежу'}</h3>
        <p>{locale === 'en' ? 'Charitable Contribution' : 'Благодійний внесок'}</p>
      </div>
      <style jsx>{`
        .contacts-list h1 {
          text-align: center;
          margin-top: 10px;
        }
        .contactsDonationInfo {
          font-size: 18px;
          border: 4px solid #2e2a1e;
          padding: 40px;
          border-radius: 15px;
          margin-top: 60px;
        }
        .contacts {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
        @media only screen and (max-width: 768px) {
          .contactsDonationInfo {
            padding: 20px;
            margin-top: 30px;
            font-size: 16px;
          }
          .contacts {
            grid-template-columns: 1fr;
            grid-gap: 30px;
          }
          .contacts-list h1 {
            font-size: 24px;
            margin-top: 0;
          }
          .contactsDonationInfo p {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  )
}
