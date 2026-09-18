import React, { useState, useEffect } from 'react';
import styles from './ChaseAnimation.module.css';
import boySprite from '../../assets/boy_running_sprite.jpg';
import girlSprite from '../../assets/girl_running_sprite.jpg';

export const ChaseAnimation: React.FC = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div className={styles.fallbackContainer}>
        <span className={styles.staticHeart}>♥</span>
        <span>Same Games. New Times.</span>
        <span className={styles.staticHeart}>♥</span>
      </div>
    );
  }

  return (
    <div className={styles.chaseContainer}>
      <div className={styles.runnersGroup}>
        
        {/* BOY */}
        <div className={styles.spriteMask}>
          <img 
            src={boySprite} 
            alt="boy running" 
            className={styles.spriteImg} 
          />
        </div>

        {/* HEART TRAIL */}
        <div className={styles.heartTrail}>
          <span className={styles.tinyHeart} style={{animationDelay: '0s'}}>♥</span>
          <span className={styles.tinyHeart} style={{animationDelay: '0.2s'}}>♥</span>
          <span className={styles.tinyHeart} style={{animationDelay: '0.4s'}}>♥</span>
        </div>

        {/* GIRL */}
        <div className={styles.spriteMask}>
          <img 
            src={girlSprite} 
            alt="girl running" 
            className={styles.spriteImg} 
          />
        </div>

      </div>
    </div>
  );
};
