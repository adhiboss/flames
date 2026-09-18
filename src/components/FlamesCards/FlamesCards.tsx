import React from 'react';
import styles from './FlamesCards.module.css';
import type { FlamesResultType } from '../../utils/flamesLogic';

interface FlamesCardsProps {
  finalResult: FlamesResultType | null;
  animatingLetter: FlamesResultType | null;
  eliminatedLetters: FlamesResultType[];
}

const CARDS = [
  { letter: 'F', label: 'Friends' },
  { letter: 'L', label: 'Love' },
  { letter: 'A', label: 'Affection' },
  { letter: 'M', label: 'Marriage' },
  { letter: 'E', label: 'Enemies' },
  { letter: 'S', label: 'Siblings' }
] as const;

export const FlamesCards: React.FC<FlamesCardsProps> = ({ finalResult, animatingLetter, eliminatedLetters }) => {
  return (
    <div className={styles.cardsContainer}>
      {CARDS.map(({ letter, label }) => {
        let cardStateClass = '';
        if (finalResult) {
          cardStateClass = finalResult === letter ? styles.highlighted : styles.subdued;
        } else if (eliminatedLetters.includes(letter)) {
          cardStateClass = styles.eliminated;
        } else if (animatingLetter) {
          cardStateClass = animatingLetter === letter ? styles.animating : '';
        }

        return (
          <div 
            key={letter} 
            className={`retro-window ${styles.flamesCard} ${styles[`card-${letter}`]} ${cardStateClass}`}
          >
            <div className={styles.flamesCardHeader}>
              <span>CODE</span>
              <div className="retro-window-controls" style={{ transform: 'scale(0.5)', transformOrigin: 'right center' }}>
                <span></span><span></span><span></span>
              </div>
            </div>
            <div className={styles.flamesCardContent}>
              <span className={styles.letter}>{letter}</span>
              <span className={styles.label}>{label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
