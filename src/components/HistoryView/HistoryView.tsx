import React from 'react';
import styles from './HistoryView.module.css';
import { useHistory } from '../../hooks/useHistory';
import folderIcon from '../../assets/folder-icon.png';

interface HistoryViewProps {
  onPlay: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ onPlay }) => {
  const { history, clearHistory } = useHistory();

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    const dateStr = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const timeStr = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    return `${dateStr} · ${timeStr}`;
  };

  return (
    <div className={`retro-window ${styles.historyWindow}`}>
      <div className="retro-window-header">
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <img src={folderIcon} alt="folder" style={{ width: '1.2em', height: '1.2em' }} /> MY HISTORY
        </span>
        <div className="retro-window-controls">
          <span></span><span></span><span></span>
        </div>
      </div>
      <div className={`retro-window-content ${styles.content}`}>
        
        {history.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Your FLAMES stories will appear here ♥<br/>Calculate your first one!</p>
            <button className={styles.playButton} onClick={onPlay}>PLAY FLAMES</button>
          </div>
        ) : (
          <>
            <div className={styles.headerRow}>
              <h2 style={{ fontFamily: 'var(--font-pixel)', fontSize: '16px' }}>RECENT RESULTS</h2>
              <button className={styles.clearBtn} onClick={clearHistory}>CLEAR HISTORY</button>
            </div>
            <div className={styles.historyList}>
              {history.map(record => (
                <div key={record.id} className={styles.historyCard}>
                  <div>
                    <div className={styles.historyNames}>
                      {record.name1} + {record.name2}
                    </div>
                    <div className={styles.historyResult}>♥ {record.fullMeaning}</div>
                  </div>
                  <div className={styles.rightSide}>
                    <div className={styles.historyTime}>{formatDate(record.timestamp)}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
};
