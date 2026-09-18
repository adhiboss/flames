import React from 'react';
import styles from './Header.module.css';
import { ChaseAnimation } from './ChaseAnimation';
import type { ViewType } from '../SidebarLeft/SidebarLeft';
import folderIcon from '../../assets/folder-icon.png';

interface HeaderProps {
  currentView?: ViewType;
  onViewChange?: (view: ViewType) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.heartIcon}>♥</div>
        <div className={styles.brand}>
          <h1 className={styles.title}>FLAMES</h1>
          <span className={styles.subtitle}>SAME GAMES. NEW TIMES.</span>
        </div>
      </div>

      <ChaseAnimation />

      <div className={styles.right}>
        <button 
          className={`${styles.navButton} ${currentView === 'home' || !currentView ? styles.active : ''}`}
          onClick={() => onViewChange?.('home')}
        >
          <span role="img" aria-label="home">♥</span> 
          <span>Home</span>
        </button>
        <button 
          className={`${styles.navButton} ${currentView === 'history' ? styles.active : ''}`}
          onClick={() => onViewChange?.('history')}
        >
          <img src={folderIcon} alt="history" style={{ width: '1.2em', height: '1.2em' }} /> 
          <span>History</span>
        </button>
      </div>
    </header>
  );
};
