import styles from '../styles/components/Profile.module.css';
export function Profile(){
  return(
      <div className={styles.profileContainer}>
         <img src="https://avatars.githubusercontent.com/u/53023996?s=400&u=3d1f72c6da7a9731e42cdb8428bc97990ecd7495&v=4" alt="Alex Lima"/>
        <div>
          <strong>Alex Lima</strong>
          <p>
          <img src="icons/level.svg" alt="level"/>
          Level 1</p>
        </div>
      
      </div>

  )
}