
import { useState, useEffect } from 'react';

export const useMedications = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    setTimeout(() => {
      setMedications([
        {
          id: 1,
          name: "Aspirin",
          dosage: "100mg", 
          frequency: "Once daily",
          time: "08:00 AM",
          taken: false
        },
        {
          id: 2,
          name: "Vitamin D",
          dosage: "1000 IU",
          frequency: "Once daily", 
          time: "09:00 AM",
          taken: true
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const toggleMedication = async (id) => {
    setMedications(prev => 
      prev.map(med => 
        med.id === id ? { ...med, taken: !med.taken } : med
      )
    );
  };

  const addMedication = async (medication) => {
    const newMed = {
      id: Date.now(),
      ...medication,
      taken: false
    };
    setMedications(prev => [...prev, newMed]);
  };

  return {
    medications,
    toggleMedication,
    addMedication,
    loading
  };
};
