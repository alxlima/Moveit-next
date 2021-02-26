import { useState,useEffect } from 'react'; //[useEffect] - é função dispara efeito colateral
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;//var goblal para indentifica formato countdown 
//componente de contagem de intervalos
export function Countdown() {
    const [time, setTime] = useState(25 * 60);//padrão valor de tempo a calcular
    const [isActive, setIsActive] = useState(false) // verifica se nosso contador esta ativou ou pausado
    const [hasFinished, setHasFinished] = useState(false); //verifico se contador finalizou

    const minutes = Math.floor(time /60); //[Mat.floor] arrendondar valor divisão do tempo  minutos totais
    const seconds = time % 60; //[Mat.floor] pego o resto da divisão

    const [minuteLeft, minuteLeftRight] = String(minutes).padStart(2,'0').split('');//[string]-converto valor [padStar(2,'0')]-parto valor 25 '2' '5' [split('')] divido cada caracter 1° posição array
    const [secondLeft, secondLeftRight] = String(seconds).padStart(2,'0').split('');//[string]-converto valor [padStar(2,'0')]-parto valor 25 '2' '5' [split('')] divido cada caracter 1° posição array

    //função que inicio o contador do tempo
    function startCountdown(){
      setIsActive(true); // [SetActive]o contador é iniciado, por padrão ele é false
    }
     
    //função para abonar ciclo de contador do tempo
    function resetCountdown(){
      clearTimeout(countdownTimeout); // limpo interval 1 seg do timeout
      setIsActive(false);
      setTime(0.1*60);// retorno o time para valor inicial- se remover isso a hora pausa
    }
    
    // Ideia inicial para para pausar o tempo do contador, caso precisar aplicar no futuro
     //função para pausar ciclo de contador do tempo
    //  function stopCountdown(){
    //     clearTimeout(countdownTimeout); // limpo interval 1 seg do timeout
    //     setIsActive(false);
    //   }
      
    //ero function onde controlo eventos de contagem tempo real
     useEffect(()=>{ 
        if (isActive && time >0){
           countdownTimeout = setTimeout(()=> {
               setTime(time -1);// retito 1 seg do contador
           }, 1000) 
         }else if (isActive && time ==0){
           setHasFinished(true);// contador finalizado
           setIsActive(false);// contador desetivado
            //  console.log('finalizou')

         }
        }, [isActive,time])//executo quando for ativo e o time muda

     
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