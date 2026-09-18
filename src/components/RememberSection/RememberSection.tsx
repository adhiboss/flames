import React from 'react';
import styles from './RememberSection.module.css';

export const RememberSection: React.FC = () => {
  return (
    <div className={styles.rememberContainer}>
      <h2 className={styles.title}>♥ REMEMBER?</h2>
      
      <div className={styles.timeline}>
        <span>Before Instagram.</span>
        <span>Before Snapchat.</span>
        <span>Before AI.</span>
      </div>
      
      <div className={styles.climax}>
        We had FLAMES.
      </div>
      
      <div className={styles.retroBox}>
        <div className={styles.boxTitle}>
          ♥ F L A M E S ♥
        </div>
        <div className={styles.instructionList}>
          <span>Write two names.</span>
          <span>Cross your fingers.</span>
          <span>Let fate decide.</span>
        </div>
      </div>
      
      <div className={styles.tags}>
        2000s • SCHOOL •<br />
        FRIENDSHIP • CRUSHES
      </div>
      
      <div className={styles.stars}>
        ✦ ✦ ✦
      </div>
      
      <div className={styles.quote}>
        “Same names.<br />
        Different stories.”
      </div>
    </div>
  );
};
