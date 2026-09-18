import React, { useState, useEffect } from 'react';
import styles from './SidebarLeft.module.css';
import folderIcon from '../../assets/folder-icon.png';
import fireIcon from '../../assets/fire-icon.png';
import statsIcon from '../../assets/stats-icon.png';
import pixelHeart from '../../assets/pixel-heart.png';
import paperPlane from '../../assets/paper-plane.png';

const NOSTALGIC_MESSAGES = [
  "Remember passing chits in class? ♥",
  "Before DMs, there were handwritten notes.",
  "Some games never really grow old.",
  "Same games. New stories.",
  "Who else played FLAMES in school? 👀"
];

export type ViewType = 'home' | 'history' | 'stats';

interface SidebarLeftProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const SidebarLeft: React.FC<SidebarLeftProps> = ({ currentView, onViewChange }) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'entering' | 'entered' | 'exiting'>('entered');

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('exiting');
      
      setTimeout(() => {
        setMsgIndex(prev => (prev + 1) % NOSTALGIC_MESSAGES.length);
        setFadeState('entering');
      }, 500);
      
      setTimeout(() => {
        setFadeState('entered');
      }, 1000);
      
    }, 6000); // switch every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <aside className={styles.sidebar}>
      <div 
        className={`${styles.menuItem} ${currentView === 'home' ? styles.active : ''}`}
        onClick={() => onViewChange('home')}
      >
        <div className={styles.itemHeader}>
          <img src={fireIcon} alt="fire" style={{ width: '1.2em', height: '1.2em', verticalAlign: 'text-bottom', marginRight: '4px' }} /> FLAMES
        </div>
        <div className={styles.itemDesc}>Find what you are</div>
      </div>

      <div 
        className={`${styles.menuItem} ${currentView === 'history' ? styles.active : ''}`}
        onClick={() => onViewChange('history')}
      >
        <div className={styles.itemHeader}>
          <img src={folderIcon} alt="folder" style={{ width: '1.2em', height: '1.2em', verticalAlign: 'text-bottom', marginRight: '4px' }} /> My History
        </div>
        <div className={styles.itemDesc}>Your past results</div>
      </div>

      <div 
        className={`${styles.menuItem} ${currentView === 'stats' ? styles.active : ''}`}
        onClick={() => onViewChange('stats')}
      >
        <div className={styles.itemHeader}>
          <img src={statsIcon} alt="stats" style={{ width: '1.2em', height: '1.2em', verticalAlign: 'text-bottom', marginRight: '4px' }} /> Stats
        </div>
        <div className={styles.itemDesc}>See your numbers</div>
      </div>

      <div className={styles.decorativeBottom}>
        <div className={styles.speechBubble}>
          GOOD FRIENDS<br/>BETTER STORIES ♥
        </div>
        
        <div className={styles.pixelBoy}>🎮</div>
        
        <div className={styles.arcadeTitle}>
          FLAMES<br/>ARCADE
        </div>
        <div className={styles.arcadeSubtitle}>
          Same games.<br/>New memories. <span style={{color: 'var(--color-secondary)'}}>♥</span>
        </div>
        
        <div className={styles.dividerContainer}>
          <div className={styles.dividerLine}></div>
          <img src={pixelHeart} alt="heart" className={styles.dividerHeart} />
          <div className={styles.dividerLine}></div>
        </div>
        
        <div className={`${styles.nostalgicContainer} ${styles[fadeState]}`}>
          <div className={styles.nostalgicMessage}>
            {NOSTALGIC_MESSAGES[msgIndex]}
          </div>
          <img src={paperPlane} alt="plane" className={styles.paperPlane} />
        </div>
        
        <div className={styles.footerText}>
          Made for the young at heart ♥
        </div>
      </div>
    </aside>
  );
};
