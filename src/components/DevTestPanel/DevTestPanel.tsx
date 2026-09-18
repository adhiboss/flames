import React, { useState } from 'react';
import styles from './DevTestPanel.module.css';
import { logCalculation } from '../../utils/analytics';

export const DevTestPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastInjected, setLastInjected] = useState<string | null>(null);

  // If not in development mode, don't render anything
  if (!import.meta.env.DEV) {
    return null;
  }

  const handleInject = async (result: string) => {
    await logCalculation(result);
    setLastInjected(result);
    setTimeout(() => setLastInjected(null), 2000);
  };

  if (!isOpen) {
    return (
      <button 
        className={styles.toggleButton} 
        onClick={() => setIsOpen(true)}
        title="Open Dev Test Panel"
      >
        ⚙️ DEV
      </button>
    );
  }

  return (
    <div className={`retro-window ${styles.panelWindow}`}>
      <div className="retro-window-header" style={{ backgroundColor: '#FF9E9E' }}>
        <span>🛠️ DEV TEST MODE</span>
        <div className="retro-window-controls">
          <span onClick={() => setIsOpen(false)} title="Close"></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={`retro-window-content ${styles.panelContent}`}>
        <p className={styles.warning}>
          These events will instantly hit the local SQLite backend to test analytics aggregation.
        </p>
        
        <div className={styles.buttonGrid}>
          <button className={styles.injectBtn} onClick={() => handleInject('Love')} style={{ borderColor: 'var(--color-secondary)' }}>♥ Love</button>
          <button className={styles.injectBtn} onClick={() => handleInject('Friends')} style={{ borderColor: 'var(--color-purple)' }}>🫂 Friends</button>
          <button className={styles.injectBtn} onClick={() => handleInject('Affection')} style={{ borderColor: 'var(--color-yellow)' }}>✨ Affection</button>
          <button className={styles.injectBtn} onClick={() => handleInject('Marriage')} style={{ borderColor: 'var(--color-mint)' }}>💍 Marriage</button>
          <button className={styles.injectBtn} onClick={() => handleInject('Enemies')} style={{ borderColor: '#FF9E9E' }}>⚔️ Enemies</button>
          <button className={styles.injectBtn} onClick={() => handleInject('Siblings')} style={{ borderColor: 'var(--color-blue)' }}>👨‍👩‍👧‍👦 Siblings</button>
        </div>

        {lastInjected && (
          <div className={styles.successMsg}>
            Injected "{lastInjected}" event!
          </div>
        )}
      </div>
    </div>
  );
};
