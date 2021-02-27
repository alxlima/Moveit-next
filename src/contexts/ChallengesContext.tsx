import { createContext, ReactNode, useState} from 'react'; //contexs são eventos que erdaran
import challenges from '../../challenges.json';// [challenges.json] é o arquivo onde tenho armazenado todos os desafios

interface Challenge { // 3 campos dos desafios que estão no arquivo challenges.json
    type:'body' | 'eye';  
    description: string;
    amout: number;
}

interface ChallengesContextData {
    level: number; 
    currentExperience: number; 
    experienceToNextLevel: number;
    challengesCompleted: number; 
    activeChallenge: Challenge;// objeto tratato em interface challenge
    levelUp: ()=> void; // [()=>void] - função que não recebe parametro retorna void.
    startNewChallenge: ()=> void;
    resetChallenge: ()=> void;    
}

interface ChallengesProviderProps {
    children: ReactNode; //[ReactNode]--aceita todo elemento children filho.
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children }:ChallengesProviderProps){
  const [level, setlevel]= useState(1);  // level do usuario. 
  const [currentExperience, setCurrentExperience] = useState(30); // status bar experiencia atual usuario
  const [challengesCompleted, setChallengesCompleted] = useState(0);// qtd de desafios completos
  
  const [activeChallenge, setActiveChallenge] = useState(null)// estado ativo do detalhes desafios

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)// [Mat.pow]calculo elevado a potenciade 2 level de experiencia do usuario

  //função onde subtraio o level
  function levelUp(){
    setlevel(level +1);
  }
   
  // função de sorteio random para cada novo desafio
  function startNewChallenge(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)//calculo randomicamente um desabilo aleatorio do total em challenges existentes.
    const challenge = challenges[randomChallengeIndex];  

    setActiveChallenge(challenge)
  }

  // função chamada quando botão falhei acionar
  function resetChallenge(){
    setActiveChallenge(null);//voltou o valor activeChallenge para original
  }
 

   return (
    <ChallengesContext.Provider 
      value={{
        level, 
        currentExperience,
        experienceToNextLevel, 
        challengesCompleted,
        levelUp, 
        startNewChallenge,
        activeChallenge, 
        resetChallenge,
        }}>
       {children}
    </ChallengesContext.Provider>
   )

}