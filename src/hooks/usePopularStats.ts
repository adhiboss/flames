import { useMemo } from 'react';
import { useStats } from './useStats';

export function usePopularStats() {
  const { stats, loading, error } = useStats();
  
  const popularStats = useMemo(() => {
    // Determine the base results
    const rawResults = stats?.week?.results || { love: 0, friends: 0, marriage: 0, siblings: 0, affection: 0, enemies: 0 };
    const total = Math.max(stats?.week?.calculations || 0, 1);
    
    // Sort and calculate percentages dynamically based on the current stats
    return [
      { label: 'Love', count: rawResults.love || 0, color: 'var(--color-secondary)' },
      { label: 'Friends', count: rawResults.friends || 0, color: 'var(--color-purple)' },
      { label: 'Marriage', count: rawResults.marriage || 0, color: 'var(--color-mint)' },
      { label: 'Siblings', count: rawResults.siblings || 0, color: 'var(--color-blue)' },
      { label: 'Affection', count: rawResults.affection || 0, color: 'var(--color-yellow)' },
      { label: 'Enemies', count: rawResults.enemies || 0, color: '#FF9E9E' }
    ]
      .map(item => ({ ...item, percent: stats ? Math.round((item.count / total) * 100) : 0 }))
      .sort((a, b) => b.percent - a.percent);
  }, [stats]);

  return { popularStats, stats, loading, error };
}
