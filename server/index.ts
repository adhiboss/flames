import express from 'express';
import cors from 'cors';
import { getDb, logEvent, getAggregateStats } from './db';

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy if running behind NGINX/Render so we get real IPs for basic rate limiting
app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());

// In-memory cache for stats to prevent DB hammering
let statsCache: { data: any, timestamp: number } | null = null;
const CACHE_TTL_MS = 15000; // 15 seconds cache

// Initialize DB on startup
getDb().then(() => console.log('Database connected')).catch(console.error);

// 1. POST /api/events
app.post('/api/events', async (req, res) => {
  try {
    const { id, event_type, result, anonymous_session_id } = req.body;
    
    // Basic validation
    if (!id || !event_type || !anonymous_session_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const ip = req.ip || req.socket.remoteAddress || 'unknown';

    // Log event idempotently
    await logEvent(id, event_type, result, anonymous_session_id, ip);

    res.status(202).json({ success: true });
  } catch (error) {
    console.error('Error logging event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 2. GET /api/stats
app.get('/api/stats', async (req, res) => {
  try {
    const now = Date.now();
    
    // Return cached data if valid
    if (statsCache && (now - statsCache.timestamp < CACHE_TTL_MS)) {
      return res.json(statsCache.data);
    }

    // Fetch fresh stats
    const [today, week] = await Promise.all([
      getAggregateStats(1), // last 24 hours
      getAggregateStats(7)  // last 7 days
    ]);

    const data = { today, week };
    
    // Update cache
    statsCache = { data, timestamp: now };

    res.json(data);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Analytics server running on http://localhost:${PORT}`);
});
