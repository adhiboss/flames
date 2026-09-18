import { useState, useEffect } from 'react';
import type { FlamesResultType } from '../utils/flamesLogic';

export interface HistoryRecord {
  id: string;
  name1: string;
  name2: string;
  result: FlamesResultType;
  fullMeaning: string;
  timestamp: number;
}

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('flames_history');
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    }
  }, []);

  const addRecord = (record: Omit<HistoryRecord, 'id' | 'timestamp'>) => {
    const newRecord: HistoryRecord = {
      ...record,
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      timestamp: Date.now()
    };
    
    setHistory(prev => {
      const updated = [newRecord, ...prev].slice(0, 50); // Keep max 50 records locally
      localStorage.setItem('flames_history', JSON.stringify(updated));
      return updated;
    });

    // Also save to JSON file via our dev server API
    // PRIVACY: Only send anonymous metadata, do not send user names.
    const anonymousStat = {
      id: newRecord.id,
      result: newRecord.result,
      timestamp: newRecord.timestamp
    };

    fetch('/api/save-entry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(anonymousStat)
    }).catch(err => console.error('Failed to save to JSON', err));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('flames_history');
  };

  return { history, addRecord, clearHistory };
};
