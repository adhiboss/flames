import express from 'express';
import cors from 'cors';
import { getDb, logEvent, getAggregateStats, logReview } from './db';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

const app = express();
const PORT = process.env.PORT || 3001;

// Remove trust proxy logic because Vercel handles IPs differently
// app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());

// In-memory cache for stats to prevent DB hammering
let statsCache: { data: any, timestamp: number } | null = null;
const CACHE_TTL_MS = 15000; // 15 seconds cache

// Initialize DB on startup (not strictly needed for vercel-postgres as it uses connection pooling automatically, but we can call it to ensure table creation)
getDb().catch(console.error);

// 1. POST /api/events
app.post('/api/events', async (req, res) => {
  try {
    const { id, event_type, result, anonymous_session_id } = req.body;
    
    // Basic validation
    if (!id || !event_type || !anonymous_session_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const ip = (req.headers['x-forwarded-for'] as string) || req.socket?.remoteAddress || 'unknown';

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

// 3. POST /api/reviews
app.post('/api/reviews', async (req, res) => {
  try {
    const { rating, nostalgic, likedUI, note } = req.body;
    
    // Validate
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Invalid rating' });
    }

    await logReview(rating, nostalgic, likedUI, note);

    // Send email via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Flames App <onboarding@resend.dev>',
        to: process.env.REVIEW_EMAIL_TO || 'adithyagowdaadhi9@gmail.com',
        subject: 'New Review for Flames App',
        html: `
          <h2>New Review Received!</h2>
          <p><strong>Rating:</strong> ${rating} / 5</p>
          <p><strong>Nostalgic:</strong> ${nostalgic === true ? 'Yes' : nostalgic === false ? 'No' : 'N/A'}</p>
          <p><strong>Liked UI:</strong> ${likedUI === true ? 'Yes' : likedUI === false ? 'No' : 'N/A'}</p>
          <p><strong>Note:</strong> ${note || 'None'}</p>
        `
      });
    } else {
      console.warn('RESEND_API_KEY not set. Email not sent.');
    }

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error handling review:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default app;
