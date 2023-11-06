import { Session } from "../services";

const sessionTimeout = 24 * 60 * 60 * 1000; // Sessions expire after 24 hours

export function cleanupSessions(activeSessions: Map<string, Session>) {
  const now = Date.now();
  for (const [sessionId, session] of activeSessions.entries()) {
    if (now - session.timestamp > sessionTimeout) {
      activeSessions.delete(sessionId);
    }
  }
}
