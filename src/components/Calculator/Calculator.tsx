import React, { useState } from 'react';
import styles from './Calculator.module.css';
import avatarBoy from '../../assets/avatar-boy.png';
import avatarGirl from '../../assets/avatar-girl.png';

interface CalculatorProps {
  onCalculate: (name1: string, name2: string) => void;
  isCalculating: boolean;
}

export const Calculator: React.FC<CalculatorProps> = ({ onCalculate, isCalculating }) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [isSwapped, setIsSwapped] = useState(false);

  const icon1 = isSwapped ? avatarGirl : avatarBoy;
  const icon2 = isSwapped ? avatarBoy : avatarGirl;

  const handleCalculate = () => {
    if (name1.trim() && name2.trim() && !isCalculating) {
      onCalculate(name1, name2);
    }
  };

  return (
    <div className={`retro-window ${styles.calculatorWindow}`}>
      <div className="retro-window-header">
        <span className={styles.headerTitle}>♥ FLAMES.EXE</span>
        <div className="retro-window-controls">
          <span></span><span></span><span></span>
        </div>
      </div>
      <div className={`retro-window-content ${styles.calcContent}`}>
        <div className={styles.classicGame}>✦ THE CLASSIC GAME ✦</div>
        
        <h1 className={styles.flamesHero}>
          <span className={styles.heartLeft}>♥</span>
          <div className={styles.titleWrapper}>
            {"FLAMES".split('').map((letter, i) => (
              <span key={i} className={styles.letter}>{letter}</span>
            ))}
          </div>
          <span className={styles.heartRight}>♥</span>
        </h1>
        
        <div className={styles.heroSubtitle}>ENTER TWO NAMES. LET FATE DECIDE.</div>



        <div className={styles.inputsContainer}>
          <div className={`retro-input-wrapper ${styles.inputBox}`}>
            <label>YOUR NAME</label>
            <div className={styles.inputFieldWrapper}>
              <img 
                src={icon1} 
                alt="user" 
                className={styles.inputIconImage} 
                onClick={() => setIsSwapped(!isSwapped)}
                title="Click to swap"
              />
              <input 
                type="text" 
                className="retro-input" 
                placeholder="Enter your name"
                value={name1}
                onChange={e => setName1(e.target.value)}
                disabled={isCalculating}
                maxLength={50}
              />
            </div>
          </div>

          <div className={styles.connection}>
            <div className={styles.dotLine}></div>
            <div className={styles.connectionCenter}>
              <button 
                className={styles.swapButtonCenter} 
                onClick={() => setIsSwapped(!isSwapped)}
                title="Swap avatars"
              >
                🔄
              </button>
              <span className={`${styles.connectionHeart} ${name1.trim() && name2.trim() ? styles.filled : ''}`} role="img" aria-label="heart">♥</span>
            </div>
            <div className={styles.dotLine}></div>
          </div>

          <div className={`retro-input-wrapper ${styles.inputBox}`}>
            <label>THEIR NAME</label>
            <div className={styles.inputFieldWrapper}>
              <img 
                src={icon2} 
                alt="user" 
                className={styles.inputIconImage}
                onClick={() => setIsSwapped(!isSwapped)}
                title="Click to swap"
              />
              <input 
                type="text" 
                className="retro-input" 
                placeholder="Enter their name"
                value={name2}
                onChange={e => setName2(e.target.value)}
                disabled={isCalculating}
                maxLength={50}
              />
            </div>
          </div>
        </div>

        <button 
          className={`retro-button ${styles.calcButton}`}
          onClick={handleCalculate}
          disabled={isCalculating || !name1.trim() || !name2.trim()}
        >
          {isCalculating ? 'CALCULATING...' : 'CALCULATE FLAMES >'}
        </button>
      </div>
    </div>
  );
};
