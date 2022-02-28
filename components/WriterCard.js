import React from 'react'

function WriterCard({ name, insta,username, deleteWriter, setModalState}) {
  return (
    <div>
        <h3>{name}</h3>
        <a href={insta}>{`@${insta.split('/')[3]}`}</a>
        <button onClick={()=>{
          setModalState({
            text: `remove ${name}?`,
            mainAction: ()=>deleteWriter(username).then(setModalState({
              text: `removed writer`,
              mainAction: ()=>location.reload(),
              show: true
            })),
            show: true
          })
        }}>
          <img  src='https://res.cloudinary.com/duta3135/image/upload/v1645856480/assets/trashcan_icon_bif2p4.png'/>
        </button>
    </div>
  )
}

export default WriterCard