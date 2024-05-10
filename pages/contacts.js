import { createClient } from 'contentful'
import Contact from '../components/Contact'

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: "contactsPage" })

  return {
    props: {
      contacts: res.items, 
    }
  }
}

export default function Contacts({ contacts }) {
  return (
    <div className="contacts-list">
      <h1>Контакти</h1>
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
      <div className='contacts'>
      {contacts.map(contact => (
        <Contact key={contact.sys.id} contact={contact}/>
      ))}
      </div>
      <style jsx>{`
        .contacts-list h1{
          text-align: center;
        }
        .donationInfo{
          font-size: 18px;
          border: 4px solid #2e2a1e;
          padding: 40px;
          border-radius: 15px;
          margin-bottom: 60px;
        }
        .contacts{
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}</style>
    </div>
  )
}
