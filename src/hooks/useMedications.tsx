
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  time?: string;
  taken: boolean;
}

export const useMedications = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Mock data - replace with actual API call
    setMedications([
      { id: 1, name: 'Vitamin D', dosage: '1000 IU', frequency: 'Once daily', time: '9:00 AM', taken: false },
      { id: 2, name: 'Omega-3', dosage: '500mg', frequency: 'Twice daily', time: '8:00 AM', taken: true },
    ]);
  }, []);

  const addMedication = async (medication: Omit<Medication, 'id' | 'taken'>) => {
    const newMed = {
      ...medication,
      id: Date.now(),
      taken: false
    };
    setMedications(prev => [...prev, newMed]);
    toast({
      title: "Medication added",
      description: `${medication.name} has been added to your list`,
    });
  };

  const toggleMedication = async (id: number) => {
    setMedications(prev => 
      prev.map(med => 
        med.id === id ? { ...med, taken: !med.taken } : med
      )
    );
  };

  return {
    medications,
    loading,
    addMedication,
    toggleMedication
  };
};
