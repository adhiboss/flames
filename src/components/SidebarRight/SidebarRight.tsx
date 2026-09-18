import React, { useState, useEffect } from 'react';
import styles from './SidebarRight.module.css';
import type { FlamesResultType } from '../../utils/flamesLogic';
import { getVibeForResult } from '../../data/vibes';
import type { VibeData } from '../../data/vibes';
import { getRandomFact } from '../../data/facts';
import { usePopularStats } from '../../hooks/usePopularStats';
import { AnimatedNumber } from '../AnimatedNumber';
import pixelHeart from '../../assets/pixel-heart.png';

interface SidebarRightProps {
  finalResult?: FlamesResultType | null;
}

export const SidebarRight: React.FC<SidebarRightProps> = ({ finalResult }) => {
  const [currentVibe, setCurrentVibe] = useState<VibeData>(getVibeForResult(null));
  const [fact] = useState(getRandomFact());
  const [vibeState, setVibeState] = useState<'entering' | 'entered' | 'exiting'>('entered');
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setVibeState('exiting');
    
    // Brief fast pulse on new result
    if (finalResult) {
      setPulse(true);
      setTimeout(() => setPulse(false), 500);
    }
    
    const timer1 = setTimeout(() => {
      setCurrentVibe(getVibeForResult(finalResult || null));
      setVibeState('entering');
      
      setTimeout(() => {
        setVibeState('entered');
      }, 50);
    }, 300); // fade out duration

    return () => {
      clearTimeout(timer1);
    };
  }, [finalResult]);

  const { popularStats, loading } = usePopularStats();


  return (
    <aside className={styles.sidebar}>
      
      <div className="retro-window">
        <div className="retro-window-header">
          <span>TODAY'S VIBE</span>
          <div className="retro-window-controls">
            <span></span><span></span><span></span>
          </div>
        </div>
        <div className="retro-window-content" style={{ padding: '32px 16px' }}>
          
          <div className={styles.iconContainer}>
            <img 
              src={pixelHeart} 
              alt="Heart" 
              className={`${styles.vibeHeart} ${pulse ? styles.fastPulse : styles.slowPulse}`} 
            />
          </div>
          
          <div className={`${styles.vibeContainer} ${styles[vibeState]}`}>
            <p className={styles.quoteText}>{currentVibe.quote}</p>
            
            <div className={styles.labelWrapper}>
              <div className={styles.labelLine}></div>
              <span className={styles.sparkleIcon}>✧</span>
              <div className={styles.pillLabel}>{currentVibe.label}</div>
              <span className={styles.sparkleIcon}>✧</span>
              <div className={styles.labelLine}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="retro-window">
        <div className="retro-window-header">
          <span>QUICK FACT</span>
          <div className="retro-window-controls">
            <span></span><span></span><span></span>
          </div>
        </div>
        <div className="retro-window-content" style={{ padding: '32px 16px' }}>
          
          <div className={styles.iconContainer}>
            <span className={`${styles.factIconLarge} ${styles.slowPulse}`}>💡</span>
          </div>
          
          <div className={styles.vibeContainer}>
            <p className={styles.quoteText}>{fact}</p>
            
            <div className={styles.labelWrapper}>
              <div className={styles.labelLine}></div>
              <span className={styles.sparkleIcon}>✧</span>
              <div className={styles.pillLabel}>NOSTALGIA FACT</div>
              <span className={styles.sparkleIcon}>✧</span>
              <div className={styles.labelLine}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="retro-window">
        <div className="retro-window-header">
          <span>POPULAR THIS WEEK</span>
          <div className="retro-window-controls">
            <span></span><span></span><span></span>
          </div>
        </div>
        <div className="retro-window-content" style={{ padding: '16px' }}>
          <div className={styles.popularList}>
            {popularStats.map((stat, i) => (
              <div key={stat.label} className={styles.popularItem}>
                <span className={styles.rank}>{i + 1}</span>
                <span className={styles.itemLabel}>♥ {stat.label}</span>
                <div className={styles.barContainer}>
                  <div 
                    className={styles.bar} 
                    style={{ 
                      width: `${loading ? 0 : stat.percent}%`, 
                      backgroundColor: stat.color,
                      transition: 'width 1s cubic-bezier(0.34, 1.56, 0.64, 1)' 
                    }}
                  ></div>
                </div>
                <span className={styles.percent}>
                  <AnimatedNumber value={stat.percent} format="percent" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.stickyNote}>
        Same Names<br />Different Stories ♥
      </div>

    </aside>
  );
};
