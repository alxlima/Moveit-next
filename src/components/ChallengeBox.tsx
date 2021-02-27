import { useContext } from 'react'; // import dentro do reac
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
     const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);// [contextData]- consumo contexto dentro da aplicação de diversos lugares
     const { resetCountdown} = useContext(CountdownContext);

     // Resetar contdown , quando acionar button completei
     function handlechallengeSucceeded(){
       completeChallenge();
       resetCountdown();   
     }
     // Resetar contdown , quando acionar button falhei
     function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();
     }


     return(
         <div className={styles.challengeBoxContainer}>
          { activeChallenge ? (
              <div className={styles.challengeActive}>
                  <header>Ganhe {activeChallenge.amount} xp</header>

                  <main>
                      <img src={`icons/${activeChallenge.type}.svg`} />
                      <strong>Novo desafio</strong>
                      <p>{activeChallenge.description}</p>
                  </main>

                  <footer>
                      <button 
                       type='button'
                       className={styles.challengeFailedButton}
                       onClick={handleChallengeFailed}
                       >
                       Falhei
                      </button>

                      <button 
                      type='button'
                      className={styles.challengeSucceededButton}
                      onClick={handlechallengeSucceeded}
                      >
                      Completei
                      </button>
                  </footer>

              </div>

              
          ) : (  //[:]-- else (..conteudo...)
              <div className={styles.challengeNotActive}>
              <strong>Finalize um ciclo para receber um desafio</strong>
              <p>
                  <img src="icons/level-up.svg" alt="Level Up"/>
                  Avance de level completando desafios.
              </p>

          </div>
          )}
         </div>
     )

}