import styles from '../styles/components/ExperienceBar.module.css'; /*Importo - Css - Model criado para ExperienceBar*/

/*Criando compoente de Barra Status de experiência*/
export function ExperienceBar(){
    return(/*ClassName-padrão utilizado no React*/ /*styles.experienceBar -cssModel especifico para meu componente experienceBar*/
       <header className={styles.experienceBar}>
        <span>0 px</span>
          <div>
              <div style={{ width: '50%' }}/>
              <span className={styles.experienceBar} style={{ left:'50%'}}>
                  300 xp
              </span>
          </div>
        <span>600 px</span>
        </header>
    );
}