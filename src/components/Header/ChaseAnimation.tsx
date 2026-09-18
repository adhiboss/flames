import React, { useState, useEffect } from 'react';
import styles from './ChaseAnimation.module.css';
import boySprite from '../../assets/boy_running_sprite.jpg';
import girlSprite from '../../assets/girl_running_sprite.jpg';

type Phase = 'boyChasing' | 'pauseRight' | 'girlChasing' | 'pauseLeft';

export const ChaseAnimation: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('pauseLeft');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let timeout: ReturnType<typeof setTimeout>;

    switch (phase) {
      case 'boyChasing':
        timeout = setTimeout(() => setPhase('pauseRight'), 4500); // Time to cross screen
        break;
      case 'pauseRight':
        timeout = setTimeout(() => setPhase('girlChasing'), 500); // Brief pause offscreen
        break;
      case 'girlChasing':
        timeout = setTimeout(() => setPhase('pauseLeft'), 4500);
        break;
      case 'pauseLeft':
        timeout = setTimeout(() => setPhase('boyChasing'), 500);
        break;
    }

    return () => clearTimeout(timeout);
  }, [phase, prefersReducedMotion]);

  // Kickstart animation on mount
  useEffect(() => {
    if (!prefersReducedMotion) {
      const initTimer = setTimeout(() => setPhase('boyChasing'), 100);
      return () => clearTimeout(initTimer);
    }
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className={styles.fallbackContainer}>
        <span className={styles.staticHeart}>♥</span>
        <span>Same Games. New Times.</span>
        <span className={styles.staticHeart}>♥</span>
      </div>
    );
  }

  const isRunningLeft = phase === 'girlChasing' || phase === 'pauseLeft';
  const isPaused = phase === 'pauseRight' || phase === 'pauseLeft';

  return (
    <div className={styles.chaseContainer}>
      <div className={`${styles.runnersGroup} ${styles[phase]} ${isRunningLeft ? styles.facingLeft : ''}`}>
        
        {/* BOY */}
        <div className={styles.spriteMask}>
          <img 
            src={boySprite} 
            alt="boy running" 
            className={`${styles.boySpriteImg} ${isPaused ? styles.paused : ''}`} 
          />
        </div>

        {/* HEART TRAIL */}
        <div className={`${styles.heartTrail} ${isPaused ? styles.hidden : ''}`}>
          <span className={styles.tinyHeart} style={{animationDelay: '0s'}}>♥</span>
          <span className={styles.tinyHeart} style={{animationDelay: '0.2s'}}>♥</span>
          <span className={styles.tinyHeart} style={{animationDelay: '0.4s'}}>♥</span>
        </div>

        {/* GIRL */}
        <div className={styles.spriteMask}>
          <img 
            src={girlSprite} 
            alt="girl running" 
            className={`${styles.girlSpriteImg} ${isPaused ? styles.paused : ''}`} 
          />
        </div>

      </div>
    </div>
  );
};
