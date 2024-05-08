import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
export default function RecipeCard( {recipe}) {
    const{title,slug,thumbnail, shortDescr} = recipe.fields
    console.log(recipe)

    let { width, height } = thumbnail.fields.file.details.image;
    if (width > 900) {
        width /= 3;
        height /= 3;
    }

  return (
      <div className="card">
        <div className="featured">
          <Image
            src={'https:' + thumbnail.fields.file.url}
            width={width}
            height={height}

            style={{ borderRadius: '15px', overflow: 'hidden'}}
          />
        </div>

        <div className="content">
          <div className="info">
            <h4> {title} </h4>
            <p>{shortDescr}</p>
          </div>

          <div className="actions">
            <Link legacyBehavior href={'/recipes/' + slug}><a> Читати далі..</a></Link>
          </div>

        </div>
        <style jsx>{`
          
          .content {
            background: #ffecb5;
            box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
            margin: 0;
            position: relative;
            top: -40px;
            left: -10px;
            border-radius: 15px;
          }
          .info {
            padding: 16px;
          }
          .info h4 {
            margin: 4px 0;
            text-transform: uppercase;
          }
          .info p {
            margin: 0;
            color: #000;
          }
          .actions {
            margin-top: 20px;
            display: flex;
            justify-content: flex-end;
          }
          .featured{
            width:600px;
            height:400px;
          }
          .actions a {
            color: #000;
            background: #ffca28;
            padding: 16px 24px;
            text-decoration: none;
            transition: 0.3s;
            border-radius: 10px;
            margin-right:15px;
            margin-top: -20px;
            margin-bottom: 15px
          }
          .actions a:hover {
            color: #ffca28;
            background: #000;
          }
        `}</style>
      </div>
  )
}
