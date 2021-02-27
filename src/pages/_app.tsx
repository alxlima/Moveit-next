//Ajustado _app.js - para _app.tsx- para pode utilizar typescript na aplicação.
//Componentes são inclusos nesta função
import '../styles/global.css' //[import] - no React, sempre importo o css para pagina do react não html

import { ChallengesProvider } from '../contexts/ChallengesContext'
import React from 'react'

function MyApp({ Component, pageProps }) {
 
  return (
     <ChallengesProvider>
          <Component {...pageProps} />
     </ChallengesProvider>
  )
} //[ChallengesContext.Provider]]- todo os elemento dentro do provider terão acesso ao elementos do contexto

export default MyApp
