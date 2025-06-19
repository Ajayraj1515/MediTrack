
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

interface MedicationLogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  medication: any;
}

export const MedicationLogDialog = ({ open, onOpenChange, medication }: MedicationLogDialogProps) => {
  if (!medication) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{medication.name} - Medication Log</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">Medication Details</h4>
            <p>Dosage: {medication.dosage}</p>
            <p>Frequency: {medication.frequency}</p>
            {medication.time && <p>Time: {medication.time}</p>}
          </div>
          <div>
            <h4 className="font-semibold mb-2">Recent Activity</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Today</span>
                </div>
                <Badge variant={medication.taken ? "default" : "secondary"}>
                  {medication.taken ? "Taken" : "Pending"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
