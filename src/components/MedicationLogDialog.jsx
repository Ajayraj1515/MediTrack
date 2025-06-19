
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Camera } from "lucide-react";

export const MedicationLogDialog = ({ open, onOpenChange, medication }) => {
  if (!medication) return null;

  // Mock log data
  const logs = [
    {
      id: 1,
      date: "2024-01-15",
      time: "08:30 AM",
      status: "taken",
      photo: true
    },
    {
      id: 2,
      date: "2024-01-14", 
      time: "08:45 AM",
      status: "taken",
      photo: false
    },
    {
      id: 3,
      date: "2024-01-13",
      time: "09:15 AM", 
      status: "missed",
      photo: false
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{medication.name} - Medication Log</DialogTitle>
          <DialogDescription>
            View your medication history and tracking details
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Medication Details</h4>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Dosage:</span> {medication.dosage}</p>
              <p><span className="font-medium">Frequency:</span> {medication.frequency}</p>
              <p><span className="font-medium">Time:</span> {medication.time || 'Not set'}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Recent Activity</h4>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {logs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      log.status === 'taken' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {log.status === 'taken' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{log.date}</p>
                      <p className="text-sm text-gray-600">{log.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={log.status === 'taken' ? 'default' : 'destructive'}>
                      {log.status}
                    </Badge>
                    {log.photo && (
                      <Badge variant="outline">
                        <Camera className="h-3 w-3 mr-1" />
                        Photo
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
