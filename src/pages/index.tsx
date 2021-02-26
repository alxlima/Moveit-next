//Merge foi ajustado index.js - para index.tsx- para pode utilizar typescript na aplicação.
import Head from 'next/head';

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { ChallengeBox } from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css';

//Nota quando adicionar html dentro de arquito Jsx finalizar [ /> ]
export default function Home() {
  return (
    <div className={styles.container}>
     <Head>
        <title>Inicio | move.it</title>  
     </Head>

    <ExperienceBar/>

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
  </div>
  )
}


// Css - Model utilizado especificamente pra um componente.