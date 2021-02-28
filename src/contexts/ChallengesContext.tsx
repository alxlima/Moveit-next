import { createContext, ReactNode, useEffect, useState} from 'react'; //contexs são eventos que erdaran
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';// [challenges.json] é o arquivo onde tenho armazenado todos os desafios
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge { // 3 campos dos desafios que estão no arquivo challenges.json
    type:'body' | 'eye';  
    description: string;
    amount: number;
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
    completeChallenge: ()=> void;
    closeLevelUpModal: ()=> void;       
}

interface ChallengesProviderProps {
    children: ReactNode; //[ReactNode]--aceita todo elemento children filho.
    level: number;
    currentExperience:number;
    challengesCompleted: number;
}


export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ 
  children, 
  ...rest // [rest] é o resto dos paramentro ChallengesProviderProps, ex. level,currentExperience,challengesCompleted,
}:ChallengesProviderProps){
  const [level, setlevel]= useState(rest.level ?? 1);  // level do usuario. se rest.level [??]-não existir salvo, então é fixo valor 1 
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0); // status bar experiencia atual usuario
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);// qtd de desafios completos
  
  const [activeChallenge, setActiveChallenge] = useState(null)// estado ativo do detalhes desafios
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false )
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)// [Mat.pow]calculo elevado a potenciade 2 level de experiencia do usuario

  useEffect(()=> {
    Notification.requestPermission(); //solicitar notificações do proprio webBrowser
  },[])

  // funcão para Salvar registros no proprio navegador web Browser
  useEffect(()=> {
   Cookies.set('level',String(level)) //[Cookies]-Salvo informações - Web Browser, é necessario instalar dependente de tipagem pro NDM
   Cookies.set('currentExperience',String(currentExperience)) 
   Cookies.set('challengesCompleted',String(challengesCompleted)) 
  },[level, currentExperience, challengesCompleted]);

  //função onde subtraio o level
  function levelUp(){
    setlevel(level +1);
    setIsLevelUpModalOpen(true); // chamo tela show modal level
  }
   
  //função para fechar tela show modal level.
  function closeLevelUpModal(){
    setIsLevelUpModalOpen(false);
  }



  // função de sorteio random para cada novo desafio
  function startNewChallenge(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)//calculo randomicamente um desabilo aleatorio do total em challenges existentes.
    const challenge = challenges[randomChallengeIndex];  

    setActiveChallenge(challenge)
    
    new Audio('/notification.mp3').play(); //[Audio]-Ip nativa navegador- [play]- tocar arquivo audio

    if (Notification.permission ==='granted') //[granted] se user deu parmissoes navegador
       new Notification ('Novo desafio 🎉',{
           body: `Valendo ${challenge.amount}xp!` 
       })
  }

  // função chamada quando botão falhei acionar
  function resetChallenge(){
    setActiveChallenge(null);//voltou o valor activeChallenge para original
  }

  // função chamada quando botão desafio completado para subir de nivel user.
  function completeChallenge(){
    if (!activeChallenge) {
        return;
    } 
    const {amount} = activeChallenge;
    let finalExperience = currentExperience + amount; // pega experiencia user + qtd desabitos tenho resultado final
                                                      // [let]- let it change - tipo var que pode receber novo valor futuro
    if(finalExperience >= experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();  
    }

    setCurrentExperience(finalExperience); 
    setActiveChallenge(null); // finzalido o desafio o mesmo é null zerado
    setChallengesCompleted(challengesCompleted + 1);//somo numero desafios completos
 }
 
   // retorno de função dentro do meu contextos
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
        completeChallenge,
        closeLevelUpModal,
        }}
      >
       {children}
       {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
   )

}