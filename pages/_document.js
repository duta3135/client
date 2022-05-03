import Document, { Html, Head, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
   render() {
      return (
         <Html>
            <Head />
        <link rel="icon" href="https://res.cloudinary.com/duta3135/image/upload/v1650616277/assets/favicon_vgrh3i.jpg" />

            <body>
               <Main />
               <div id='modal-root' /> 
               <NextScript />
            </body>
         </Html>
      )
   }
}