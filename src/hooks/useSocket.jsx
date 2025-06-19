
import { useEffect } from 'react';

export const useSocket = (userId) => {
  useEffect(() => {
    if (!userId) return;

    console.log(`Socket connected for user: ${userId}`);
    
    // Mock socket connection - replace with actual socket implementation
    const cleanup = () => {
      console.log(`Socket disconnected for user: ${userId}`);
    };

    return cleanup;
  }, [userId]);
};
