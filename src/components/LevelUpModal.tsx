import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/LevelUpModal.module.css';
 
 // função de retono componente modal de show apresentação de ciclo de desafios concluido
 export function LevelUpModal(){
    const { level, closeLevelUpModal } = useContext(ChallengesContext); 
    return(
      <div className={styles.overlay}>
          <div className={styles.container}>
             <header>{level}</header>

             <strong> Parabéns 
               <div>
                  <img className={styles.imgSucess}src="/icons/LevelUdRank.gif" alt="trofeu"/>
               </div>   
             </strong>
               
             <p>Você alcançou um novo level.</p>
            
             <button type="button" onClick={closeLevelUpModal}>
                 <img src="/icons/close.svg" alt="Fechar modal"/>
             </button>
          </div>
      </div>
    )

 }