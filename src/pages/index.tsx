//Merge foi ajustado index.js - para index.tsx- para pode utilizar typescript na aplicação.
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { ChallengeBox } from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css';
// import React from 'react';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomePage {
  level: number;
  currentExperience:number;
  challengesCompleted: number;
}

//Nota quando adicionar html dentro de arquito Jsx finalizar [ /> ]
export default function Home(props: HomePage) { 
  return (
    //[ChallengesContext.Provider]]- todo os elemento dentro do provider terão acesso ao elementos do contexto
    <ChallengesProvider 
       level={ props.level}
       currentExperience={ props.currentExperience}
       challengesCompleted={ props.challengesCompleted}
       > 
     <div className={styles.container}>
      <Head>
         <title>Inicio | move.it</title>  
      </Head>

     <ExperienceBar/>
    
     <CountdownProvider>
      <section>
        <div> 
           <Profile />
           <CompletedChallenges />
           <Countdown />
        </div>
        <div>
          <ChallengeBox />
        </div>
      </section>
     </CountdownProvider>
   </div>
  </ChallengesProvider>
  )
}


// criando função assincrona que pemite retornar conteudo do cookie para salvar 
// [getServerSideProps] consigo manipular dados da camada Next.js(node.js) para Front-end(React).
export const getServerSideProps: GetServerSideProps = async(ctx) => {//todo process interno, nesta função executa só servidor node.js e não no brawoser
  //pegar dados da API
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies; // retorno todos os cookies do contexto da aplicação.

  return{
     props: {
       level: Number(level),
       currentExperience: Number(currentExperience),
       challengesCompleted: Number(challengesCompleted)
     }
  }
}
