//Ajustado _app.js - para _app.tsx- para pode utilizar typescript na aplicação.
//Componentes são inclusos nesta função
import '../styles/global.css' //[import] - no React, sempre importo o css para pagina do react não html

function MyApp({ Component, pageProps }) {
  return (
          <Component {...pageProps} />
  )
} 

export default MyApp
