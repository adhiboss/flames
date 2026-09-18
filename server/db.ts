import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

// Define the shape of our stats return object
export interface StatsResult {
  calculations: number;
  results: {
    love: number;
    friends: number;
    marriage: number;
    siblings: number;
    affection: number;
    enemies: number;
  };
}

let dbInstance: Database | null = null;

export async function getDb() {
  if (dbInstance) return dbInstance;
  
  const dbPath = process.env.DB_PATH || path.join(__dirname, 'flames_analytics.sqlite');
  
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      event_type TEXT NOT NULL,
      result TEXT,
      anonymous_session_id TEXT NOT NULL,
      ip_address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at);
    CREATE INDEX IF NOT EXISTS idx_events_session ON events(anonymous_session_id);
  `);

  dbInstance = db;
  return db;
}

// Get aggregate stats for a specific time window
export async function getAggregateStats(sinceDays: number): Promise<StatsResult> {
  const db = await getDb();
  
  // Use datetime modifier to get events since X days ago
  const rows = await db.all(`
    SELECT result, COUNT(*) as count 
    FROM events 
    WHERE event_type = 'calculation_completed' 
    AND created_at >= datetime('now', '-${sinceDays} days')
    GROUP BY result
  `);

  const results = {
    love: 0,
    friends: 0,
    marriage: 0,
    siblings: 0,
    affection: 0,
    enemies: 0
  };

  let total = 0;

  for (const row of rows) {
    if (!row.result) continue;
    const r = row.result.toLowerCase() as keyof typeof results;
    if (results[r] !== undefined) {
      results[r] = row.count;
      total += row.count;
    }
  }

  return {
    calculations: total,
    results
  };
}

// Log a new event safely
export async function logEvent(
  id: string, 
  eventType: string, 
  result: string | null, 
  sessionId: string, 
  ipAddress: string
) {
  const db = await getDb();
  
  // INSERT OR IGNORE ensures duplicate event IDs (retries) are dropped
  await db.run(`
    INSERT OR IGNORE INTO events (id, event_type, result, anonymous_session_id, ip_address)
    VALUES (?, ?, ?, ?, ?)
  `, [id, eventType, result, sessionId, ipAddress]);
}
