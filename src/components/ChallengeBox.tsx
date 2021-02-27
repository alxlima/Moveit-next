import { useContext } from 'react'; // import dentro do reac
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
     const { activeChallenge,resetChallenge } = useContext(ChallengesContext);// [contextData]- consumo contexto dentro da aplicação de diversos lugares
     
     return(
         <div className={styles.challengeBoxContainer}>
          { activeChallenge ? (
              <div className={styles.challengeActive}>
                  <header>Ganhe {activeChallenge.amout} xp</header>

                  <main>
                      <img src={`icons/${activeChallenge.type}.svg`} />
                      <strong>Novo desafio</strong>
                      <p>{activeChallenge.description}</p>
                  </main>

                  <footer>
                      <button 
                       type='button'
                       className={styles.challengeFailedButton}
                       onClick={resetChallenge }
                       >
                       Falhei
                      </button>

                      <button 
                      type='button'
                      className={styles.challengeSucceededButton}
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