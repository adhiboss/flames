export function getSessionId(): string {
  let id = localStorage.getItem('flames_session_id');
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
    localStorage.setItem('flames_session_id', id);
  }
  return id;
}

export async function logCalculation(result: string) {
  try {
    const eventId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
    const apiUrl = import.meta.env.VITE_API_URL || '';
    await fetch(`${apiUrl}/api/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: eventId,
        event_type: 'calculation_completed',
        result,
        anonymous_session_id: getSessionId()
      })
    });
  } catch (err) {
    console.error('Failed to log calculation', err);
  }
}
