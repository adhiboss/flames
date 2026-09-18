import React from 'react';
import styles from './DeskDecorations.module.css';

export const DeskDecorations: React.FC = () => {
  return (
    <div className={styles.decorationsContainer}>
      <div className={styles.leftSide}>
        <div className={`${styles.stickyNote} ${styles.noteTop}`}>
          <div className={styles.tape}></div>
          good<br />friends<br />better<br />stories <span style={{fontSize:'12px'}}>♥</span>
        </div>
        
        <div className={styles.bookStack}>
          <div className={styles.book} style={{ backgroundColor: '#FFD1D1', transform: 'rotate(-2deg)' }}>SCHOOL DAYS</div>
          <div className={styles.book} style={{ backgroundColor: '#D8B4F8', transform: 'translateX(-5px)' }}>FRIENDS</div>
          <div className={styles.book} style={{ backgroundColor: '#FFC7E8', transform: 'rotate(1deg) translateX(2px)' }}>CRUSHES</div>
          <div className={styles.book} style={{ backgroundColor: '#FFC099', transform: 'translateX(-3px)' }}>GOOD TIMES</div>
          <div className={styles.book} style={{ backgroundColor: '#F5A6D6', transform: 'rotate(-1deg)' }}>SAME NAMES <span style={{fontSize:'10px'}}>♥</span></div>
        </div>

        <div className={`${styles.stickyNote} ${styles.noteBottom}`}>
          FLAMES<br />4 EVER?<br />♡
        </div>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.retroWindow}>
          <div className={styles.windowHeader}>
            <span>Friends.exe</span>
            <div className={styles.windowControls}>
              <span></span><span></span><span style={{backgroundColor: '#FF72B6'}}></span>
            </div>
          </div>
          <div className={styles.windowContent}>
            <div className={styles.fileItem}><span className={styles.fileIcon} style={{backgroundColor: '#84D6B5'}}></span> Good Friends</div>
            <div className={styles.fileItem}><span className={styles.fileIcon} style={{backgroundColor: '#FFDE59'}}></span> Silly Crushes</div>
            <div className={styles.fileItem}><span className={styles.fileIcon} style={{backgroundColor: '#F5A6D6'}}></span> Bigger Dreams</div>
            <div className={styles.windowFooter}>Always together... <span style={{color: 'var(--color-secondary)'}}>♥</span></div>
          </div>
        </div>

        <div className={styles.mp3Player}>
          <div className={styles.screen}>
            Good<br/>Music<br/>Brighter<br/>Days
            <div className={styles.screenArrow}>&gt;</div>
          </div>
          <div className={styles.clickWheel}>
            <div className={styles.wheelCenter}></div>
            <div className={styles.wheelBtn} style={{top: '4px'}}>MENU</div>
            <div className={styles.wheelBtn} style={{bottom: '4px'}}>▶||</div>
            <div className={styles.wheelBtn} style={{left: '4px'}}>|&lt;&lt;</div>
            <div className={styles.wheelBtn} style={{right: '4px'}}>&gt;&gt;|</div>
          </div>
          <div className={styles.headphones}></div>
        </div>

        <div className={styles.notebook}>
          <div className={styles.spiral}></div>
          <div className={styles.notebookText}>
            Same Names<br/>Different Stories<br/><span>♥</span>
          </div>
        </div>
      </div>
    </div>
  );
};
