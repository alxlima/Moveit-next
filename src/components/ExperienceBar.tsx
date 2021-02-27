import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/ExperienceBar.module.css'; /*Importo - Css - Model criado para ExperienceBar*/

/*Criando compoente de Barra Status de experiência*/
export function ExperienceBar(){

   // incluido novo contexto status atual progresso desafios de experiencia usuario
   const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);
 
   const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;//percentual barra status desafio concluido

    return(/*ClassName-padrão utilizado no React*/ /*styles.experienceBar -cssModel especifico para meu componente experienceBar*/
       <header className={styles.experienceBar}>
        <span>0 xp</span>
          <div>
              <div style={{ width: `${percentToNextLevel}%` }}/>
              <span className={styles.currentExperience} style={{ left:`${percentToNextLevel}%`}}>
                  {currentExperience} xp
              </span>
          </div>
         <span>{experienceToNextLevel} xp</span>
        </header>
    );
}