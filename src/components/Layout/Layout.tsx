import React from 'react';
import { Header } from '../Header/Header';
import { SidebarLeft } from '../SidebarLeft/SidebarLeft';
import { SidebarRight } from '../SidebarRight/SidebarRight';
import { CreatorSection } from '../CreatorSection/CreatorSection';
import styles from './Layout.module.css';

import type { ViewType } from '../SidebarLeft/SidebarLeft';
import type { FlamesResultType } from '../../utils/flamesLogic';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  finalResult?: FlamesResultType | null;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onViewChange, finalResult }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.bgElements}>
        <span className={styles.bgElement} role="img" aria-label="sparkle">✨</span>
        <span className={styles.bgElement} role="img" aria-label="heart">♥</span>
        <span className={styles.bgElement} role="img" aria-label="cloud">☁️</span>
        <span className={styles.bgElement} role="img" aria-label="sparkle">♡</span>
      </div>
      <Header currentView={currentView} onViewChange={onViewChange} />
      <div className={styles.mainContent}>
        <SidebarLeft currentView={currentView} onViewChange={onViewChange} />
        <main className={styles.centerCol}>
          {children}
          <CreatorSection />
        </main>
        <SidebarRight finalResult={finalResult} />
      </div>
      <footer className={styles.footer}>
        <div>v1.0.0 | Made for the young at heart ♥</div>
        <div className={styles.footerLinks}>
          <span>Play</span>
          <span>•</span>
          <span>Share</span>
          <span>•</span>
          <span>Relive</span>
        </div>
      </footer>
    </div>
  );
};
