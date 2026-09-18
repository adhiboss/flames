import React from 'react';
import styles from './StatsView.module.css';
import { usePopularStats } from '../../hooks/usePopularStats';
import { AnimatedNumber } from '../AnimatedNumber';
import fireIcon from '../../assets/fire-icon.png';
import statsIcon from '../../assets/stats-icon.png';

export const StatsView: React.FC = () => {
  const { popularStats, stats, loading } = usePopularStats();
  
  const todayResults = stats?.today?.results || { love: 0, friends: 0, marriage: 0 };
  const todayCalculations = stats?.today?.calculations || 0;

  return (
    <div className={`retro-window ${styles.statsWindow}`}>
      <div className="retro-window-header">
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <img src={statsIcon} alt="stats" style={{ width: '1.2em', height: '1.2em' }} /> STATS
        </span>
        <div className="retro-window-controls">
          <span></span><span></span><span></span>
        </div>
      </div>
      <div className={`retro-window-content ${styles.content}`}>
        
        <div>
          <h2 className={styles.sectionTitle}>TODAY'S FLAMES</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <img src={fireIcon} alt="fire" style={{ width: '1em', height: '1em' }} />
              </div>
              <div className={styles.statNumber}>
                <AnimatedNumber value={todayCalculations} />
              </div>
              <div className={styles.statLabel}>Calculations today</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>♥</div>
              <div className={styles.statNumber}>
                <AnimatedNumber value={todayResults.love} />
              </div>
              <div className={styles.statLabel}>Love results</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🫂</div>
              <div className={styles.statNumber}>
                <AnimatedNumber value={todayResults.friends} />
              </div>
              <div className={styles.statLabel}>Friends results</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>💍</div>
              <div className={styles.statNumber}>
                <AnimatedNumber value={todayResults.marriage} />
              </div>
              <div className={styles.statLabel}>Marriage results</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className={styles.sectionTitle}>POPULAR THIS WEEK</h2>
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
    </div>
  );
};
