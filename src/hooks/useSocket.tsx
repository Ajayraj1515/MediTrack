
import { useEffect } from 'react';

export const useSocket = (userId?: string) => {
  useEffect(() => {
    if (!userId) return;
    
    // Mock socket connection - replace with actual socket.io implementation
    console.log(`Socket connected for user: ${userId}`);
    
    return () => {
      console.log(`Socket disconnected for user: ${userId}`);
    };
  }, [userId]);
};
