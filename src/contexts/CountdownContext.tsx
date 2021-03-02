import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface ContdownContexData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode; //[ReactNode]--aceita todo elemento children filho.
}

export const CountdownContext = createContext({} as ContdownContexData)

let countdownTimeout: NodeJS.Timeout;//var goblal para indentifica formato countdown 

//componente de contagem de intervalos
export function CountdownProvider({ children }: CountdownProviderProps) {
    
    const { startNewChallenge } = useContext(ChallengesContext);//[contextData]- consumo contexto dentro da aplicação de diversos lugares
    //console.log(contexData);

    const [time, setTime] = useState(25 * 60);//padrão valor de tempo a calcular
    const [isActive, setIsActive] = useState(false) // verifica se nosso contador esta ativou ou pausado
    const [hasFinished, setHasFinished] = useState(false); //verifico se contador finalizou

    const minutes = Math.floor(time /60); //[Mat.floor] arrendondar valor divisão do tempo  minutos totais
    const seconds = time % 60; //[Mat.floor] pego o resto da divisão
    
     //função que inicio o contador do tempo
     function startCountdown(){
        setIsActive(true); // [SetActive]o contador é iniciado, por padrão ele é false
      }
       
      //função para abonar ciclo de contador do tempo
      function resetCountdown(){
        clearTimeout(countdownTimeout); // limpo interval 1 seg do timeout
        setIsActive(false);
        setHasFinished(false);
        setTime(25*60);// retorno o time para valor inicial- se remover isso a hora pausa
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
             startNewChallenge();
            //console.log('finalizou')
           }
          }, [isActive,time])//executo quando for ativo e o time muda
  
    
    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    ) 

}