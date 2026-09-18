import { neon } from '@neondatabase/serverless';

// Retrieve the database URL securely from Vercel environment variables
const getSql = () => {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not set. Please connect Neon in Vercel Storage.");
    return null;
  }
  return neon(process.env.DATABASE_URL);
};

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

let tableCreated = false;

export async function getDb() {
  if (tableCreated) return;
  
  const sql = getSql();
  if (!sql) return;

  await sql`
    CREATE TABLE IF NOT EXISTS events (
      id VARCHAR(255) PRIMARY KEY,
      event_type VARCHAR(255) NOT NULL,
      result VARCHAR(255),
      anonymous_session_id VARCHAR(255) NOT NULL,
      ip_address VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  // Vercel Postgres doesn't need explicit indexes for small tables, but we can add them if missing.
  // We'll skip index creation here to avoid duplicate errors on serverless spin-ups.
  tableCreated = true;
}

// Get aggregate stats for a specific time window
export async function getAggregateStats(sinceDays: number): Promise<StatsResult> {
  const results = {
    love: 0,
    friends: 0,
    affection: 0,
    marriage: 0,
    enemies: 0,
    siblings: 0
  };

  const sql = getSql();
  if (!sql) return { calculations: 0, results };

  const { rows } = await sql`
    SELECT result, COUNT(*) as count 
    FROM events 
    WHERE event_type = 'calculation_completed' 
    AND created_at >= NOW() - INTERVAL '1 day' * ${sinceDays}
    GROUP BY result
  `;

  let total = 0;

  for (const row of rows) {
    if (!row.result) continue;
    const r = row.result.toLowerCase() as keyof typeof results;
    if (results[r] !== undefined) {
      results[r] = Number(row.count);
      total += Number(row.count);
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
  const sql = getSql();
  if (!sql) return;

  // Use ON CONFLICT DO NOTHING for idempotency
  await sql`
    INSERT INTO events (id, event_type, result, anonymous_session_id, ip_address)
    VALUES (${id}, ${eventType}, ${result}, ${sessionId}, ${ipAddress})
    ON CONFLICT (id) DO NOTHING
  `;
}
