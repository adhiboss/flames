import React from 'react';
import styles from './WhitespaceDecorations.module.css';

export const WhitespaceDecorations: React.FC = () => {
  return (
    <div className={styles.decorationsContainer}>
      
      {/* Top area */}
      <div className={`${styles.decorationItem} ${styles.cloud} ${styles.floater} ${styles.item1}`}>
        ☁️
      </div>
      <div className={`${styles.decorationItem} ${styles.doodle} ${styles.floater} ${styles.item2}`}>
        did it ever work?
      </div>
      
      {/* Middle area */}
      <div className={`${styles.decorationItem} ${styles.star} ${styles.floater} ${styles.item3}`}>
        ✦
      </div>
      <div className={`${styles.decorationItem} ${styles.heart} ${styles.floater} ${styles.item4}`}>
        ♥
      </div>
      <div className={`${styles.decorationItem} ${styles.doodle} ${styles.floater} ${styles.item5}`}>
        note passing class...
      </div>

      {/* Bottom area */}
      <div className={`${styles.decorationItem} ${styles.cloud} ${styles.floater} ${styles.item6}`}>
        ☁️
      </div>
      <div className={`${styles.decorationItem} ${styles.doodle} ${styles.floater} ${styles.item7}`}>
        silly crushes
      </div>
      <div className={`${styles.decorationItem} ${styles.star} ${styles.floater} ${styles.item8}`}>
        ✨
      </div>

    </div>
  );
};
