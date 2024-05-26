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
  console.log(contacts)
  return (
    <div className="contacts-list">
      <h1>Контакти</h1>
      
      <div className='contacts'>
      {contacts.map(contact => (
        <Contact key={contact.sys.id} contact={contact}/>
      ))}
      </div>

      <div className="contactsDonationInfo">
        <h3>Отримувач</h3>
        <p>КОНЬОВСЬКИЙ ІГОР МИРОНОВИЧ</p>
        <h3>IBAN рахунок</h3>
        <p>UA873257960000026007300539780</p>
        <h3>РНОКПП/ЄДРПОУ</h3>
        <p>44817809</p>
        <h3>Призначення платежу</h3>
        <p>Благодійний внесок</p>
      </div>
      <style jsx>{`
        .contacts-list h1{
          text-align: center;
        }
        .contactsDonationInfo{
          font-size: 18px;
          border: 4px solid #2e2a1e;
          padding: 40px;
          border-radius: 15px;
          margin-top: 60px;
        }
        .contacts{
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
        @media only screen and (max-width: 768px) {

          .contactsDonationInfo{
            padding: 20px;
            margin-top: 30px;
            font-size:16px;
          }
          .contacts {
            /* Змінюємо сітку на одну колонку */
            grid-template-columns: 1fr;
            grid-gap: 30px ;
          }
          .contacts-list h1{
            font-size: 24px;
            margin-top: 0;
          }
          .contactsDonationInfo p{
            font-size: 14px

        }
      `}</style>
    </div>
  )
}
