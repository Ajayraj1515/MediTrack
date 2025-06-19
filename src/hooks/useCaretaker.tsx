
import { useState, useEffect } from 'react';

interface Patient {
  id: string;
  name: string;
  adherence: number;
  status: 'excellent' | 'good' | 'needs attention';
  lastTaken: string;
}

export const useCaretaker = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mock data - replace with actual API call
    setPatients([
      { id: '1', name: 'John Doe', adherence: 95, status: 'excellent', lastTaken: '2 hours ago' },
      { id: '2', name: 'Mary Johnson', adherence: 78, status: 'needs attention', lastTaken: '1 day ago' },
      { id: '3', name: 'Bob Wilson', adherence: 88, status: 'good', lastTaken: '4 hours ago' },
    ]);
  }, []);

  return {
    patients,
    loading
  };
};
