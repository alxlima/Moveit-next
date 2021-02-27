import { useState,useEffect, useContext } from 'react'; //[useEffect] - é função dispara efeito colateral
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';


//componente de contagem de intervalos
export function Countdown() {
  const { minutes, 
          seconds, 
          hasFinished, 
          isActive, 
          startCountdown, 
          resetCountdown 
        }= useContext(CountdownContext) // busco variaveis do componente contexto regra negocio
   
    // formato exclusivo numeros para adeguar a visualização no layout
    const [minuteLeft, minuteLeftRight] = String(minutes).padStart(2,'0').split('');//[string]-converto valor [padStar(2,'0')]-parto valor 25 '2' '5' [split('')] divido cada caracter 1° posição array
    const [secondLeft, secondLeftRight] = String(seconds).padStart(2,'0').split('');//[string]-converto valor [padStar(2,'0')]-parto valor 25 '2' '5' [split('')] divido cada caracter 1° posição array
 
    return(
       <div>
         <div className={styles.countdownContainer}>
            <div>
                <span>{minuteLeft}</span>
                <span>{minuteLeftRight}</span>
            </div>
            <span>:</span>
            <div>
                <span>{secondLeft}</span>
                <span>{secondLeftRight}</span>
            </div>   
         </div>

           { hasFinished ? ( //se finalizado contador
              <button 
              disabled  
              className={styles.countdownButton}
              >
              Ciclo encerrado  
             </button> 
           ):( 
             <> 
               { isActive ? ( // se cancelar a contagem
                <button 
                type="button" 
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick={resetCountdown}
                >
                Abondonar ciclo   
               </button> 

           ) : (   // se iniciar a contagem
             <button  
             type="button" 
             className={styles.countdownButton}
             onClick={startCountdown}
             >
             Iniciar um ciclo
            </button>  
           )
           }
             </>
           )}

          

           
           {/* // Ideia inicial para para pausar o tempo do contador, caso precisar aplicar no futuro
           <button 
             type="button" 
             className={styles.countdownButton}
             onClick={stopCountdown}
             >
             Pausar Ciclo
            </button>   */}

           
        </div>  
    )
}