
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, isSameDay } from 'date-fns';
import { CalendarDays, CheckCircle, AlertCircle } from 'lucide-react';

interface MedicationDay {
  date: Date;
  taken: number;
  total: number;
  status: 'complete' | 'partial' | 'missed';
}

interface MedicationCalendarProps {
  medications: any[];
}

export const MedicationCalendar = ({ medications }: MedicationCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Mock data for demonstration - in real app, this would come from backend
  const medicationDays: MedicationDay[] = [
    { date: new Date(), taken: 2, total: 2, status: 'complete' },
    { date: new Date(Date.now() - 86400000), taken: 1, total: 2, status: 'partial' },
    { date: new Date(Date.now() - 172800000), taken: 0, total: 2, status: 'missed' },
  ];

  const getDayStatus = (date: Date) => {
    const dayData = medicationDays.find(day => isSameDay(day.date, date));
    return dayData?.status || 'upcoming';
  };

  const getSelectedDayData = () => {
    return medicationDays.find(day => isSameDay(day.date, selectedDate));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarDays className="h-5 w-5 mr-2" />
            Medication Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border"
            modifiers={{
              complete: (date) => getDayStatus(date) === 'complete',
              partial: (date) => getDayStatus(date) === 'partial',
              missed: (date) => getDayStatus(date) === 'missed',
            }}
            modifiersStyles={{
              complete: { backgroundColor: '#dcfce7', color: '#166534' },
              partial: { backgroundColor: '#fef3c7', color: '#92400e' },
              missed: { backgroundColor: '#fee2e2', color: '#991b1b' },
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {format(selectedDate, 'MMMM d, yyyy')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {getSelectedDayData() ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Adherence</span>
                <Badge variant={
                  getSelectedDayData()?.status === 'complete' ? 'default' :
                  getSelectedDayData()?.status === 'partial' ? 'secondary' : 'destructive'
                }>
                  {getSelectedDayData()?.taken} / {getSelectedDayData()?.total}
                </Badge>
              </div>
              
              <div className="space-y-2">
                {medications.map((med) => (
                  <div key={med.id} className="flex items-center justify-between p-2 border rounded">
                    <span className="font-medium">{med.name}</span>
                    {Math.random() > 0.5 ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No medication data for this date
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
