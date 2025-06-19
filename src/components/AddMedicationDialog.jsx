
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export const AddMedicationDialog = ({ open, onOpenChange, onAdd }) => {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [time, setTime] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !dosage || !frequency) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    onAdd({ name, dosage, frequency, time });
    
    // Reset form
    setName('');
    setDosage('');
    setFrequency('');
    setTime('');
    
    onOpenChange(false);
    
    toast({
      title: "Medication added successfully",
      description: `${name} has been added to your medication list`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Medication</DialogTitle>
          <DialogDescription>
            Add a new medication to your daily routine
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Medication Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Aspirin"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dosage">Dosage *</Label>
            <Input
              id="dosage"
              placeholder="e.g., 100mg"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency *</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="once-daily">Once daily</SelectItem>
                <SelectItem value="twice-daily">Twice daily</SelectItem>
                <SelectItem value="three-times-daily">Three times daily</SelectItem>
                <SelectItem value="four-times-daily">Four times daily</SelectItem>
                <SelectItem value="as-needed">As needed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Preferred Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Medication</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
