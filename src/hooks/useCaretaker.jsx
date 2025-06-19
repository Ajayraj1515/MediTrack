
import { useState, useEffect } from 'react';

export const useCaretaker = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    setTimeout(() => {
      setPatients([
        {
          id: 1,
          name: "John Doe",
          adherence: 85,
          status: "good",
          lastActivity: "2 hours ago",
          medications: 3,
          upcoming: 1
        },
        {
          id: 2,
          name: "Jane Smith", 
          adherence: 60,
          status: "needs attention",
          lastActivity: "1 day ago",
          medications: 4,
          upcoming: 2
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return {
    patients,
    loading
  };
};
