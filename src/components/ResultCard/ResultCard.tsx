import React from 'react';
import styles from './ResultCard.module.css';
import type { FlamesCalculation } from '../../utils/flamesLogic';

interface ResultCardProps {
  name1: string;
  name2: string;
  calculation: FlamesCalculation;
  onClose: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ name1, name2, calculation, onClose }) => {
  const getPlayfulDescription = (result: string) => {
    switch (result) {
      case 'F': return 'Besties detected.';
      case 'L': return 'Looks like there\'s something here... 👀';
      case 'A': return 'Someone\'s got a soft spot.';
      case 'M': return 'Okay... things escalated quickly.';
      case 'E': return 'Maybe keep a little distance.';
      case 'S': return 'Same energy. Different problems.';
      default: return 'Fate has spoken.';
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'FLAMES Result',
          text: `${name1} + ${name2} = ${calculation.fullMeaning} ♥\nCalculate your FLAMES!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      navigator.clipboard.writeText(`${name1} + ${name2} = ${calculation.fullMeaning} ♥`);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.resultWindow}>
        <div className={styles.windowHeader}>
          <span>FLAMES RESULT</span>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.names}>
            {name1.toUpperCase()} <br/>
            <span style={{ color: 'var(--color-secondary)' }}>+</span><br/>
            {name2.toUpperCase()}
          </div>
          
          <h2 className={styles.resultHero}>
            <div className={styles.particles}>
              {[...Array(6)].map((_, i) => (
                <span 
                  key={i} 
                  className={styles.particle} 
                  style={{
                    '--tx': `${(Math.random() - 0.5) * 200}px`, 
                    '--ty': `${(Math.random() - 0.5) * 200}px`,
                    '--rot': `${(Math.random() - 0.5) * 360}deg`,
                    animationDelay: `${Math.random() * 200}ms`
                  } as React.CSSProperties}
                >
                  {['✨', '♥', '♡'][i % 3]}
                </span>
              ))}
            </div>
            {calculation.fullMeaning.toUpperCase()}
          </h2>
          
          <p className={styles.description}>
            {getPlayfulDescription(calculation.result)}
          </p>
          
          <p className={styles.disclaimer}>
            FLAMES is a nostalgic game — not a real compatibility test.
          </p>
          
          <div className={styles.actions}>
            <button className={styles.btnPrimary} onClick={handleShare}>
              ♥ SHARE RESULT
            </button>
            <button className={styles.btnSecondary} onClick={onClose}>
              TRY AGAIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
