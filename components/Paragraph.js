import React from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'


export default function Paragraph({ paragraph }) {
    const { title, text_field } = paragraph.fields
    const isTitleEven = parseInt(title) % 2 === 0;
    

    return (
        <div className={`card`}>
          <div className="content">
            <div className="info" style={{ textAlign: isTitleEven ? 'right' : 'left' }}>
              {documentToReactComponents(text_field)}
            </div>
          </div>
          <style jsx>{`
            .card {
              display: flex;
              justify-content: ${isTitleEven ? 'flex-end' : 'flex-start'};
              font-size: 22px;
            }
            .content {
              margin: 0;
              top: -40px;
              left: -10px;
            }
            .info {
              max-width:56vw;
              width:100%;
            }
            @media only screen and (max-width: 768px) {

              .info{
                max-width: 80vh;
                width: 100%;
              }
            }


            

            }
          `}</style>
        </div>
    );
}
