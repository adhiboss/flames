import { useState, useEffect } from 'react';

export interface ApiStats {
  today: { calculations: number, results: Record<string, number> };
  week: { calculations: number, results: Record<string, number> };
}

export function useStats() {
  const [stats, setStats] = useState<ApiStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchStats = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${apiUrl}/api/stats`);
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        if (mounted) {
          setStats(data);
          setError(false);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to fetch stats', err);
        if (mounted) {
          setError(true);
          setLoading(false);
        }
      }
    };

    fetchStats();
    
    // Refresh every 60 seconds
    const interval = setInterval(fetchStats, 60000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { stats, loading, error };
}
