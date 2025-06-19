
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format, isSameDay } from 'date-fns';
import { CalendarDays, Users, Clock, AlertTriangle } from 'lucide-react';

interface CalendarEvent {
  id: string;
  date: Date;
  patient: string;
  type: 'medication' | 'appointment' | 'reminder';
  title: string;
  status: 'completed' | 'pending' | 'missed';
}

interface CalendarViewProps {
  patients: any[];
}

export const CalendarView = ({ patients }: CalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  // Mock calendar events
  const events: CalendarEvent[] = [
    {
      id: '1',
      date: new Date(),
      patient: 'John Doe',
      type: 'medication',
      title: 'Evening medication due',
      status: 'pending',
    },
    {
      id: '2',
      date: new Date(),
      patient: 'Mary Johnson',
      type: 'reminder',
      title: 'Weekly check-in',
      status: 'completed',
    },
    {
      id: '3',
      date: new Date(Date.now() + 86400000),
      patient: 'Bob Wilson',
      type: 'appointment',
      title: 'Doctor appointment',
      status: 'pending',
    },
  ];

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const getSelectedDateEvents = () => {
    return getEventsForDate(selectedDate);
  };

  const hasEvents = (date: Date) => {
    return getEventsForDate(date).length > 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button
            variant={viewMode === 'month' ? 'default' : 'outline'}
            onClick={() => setViewMode('month')}
            size="sm"
          >
            Month
          </Button>
          <Button
            variant={viewMode === 'week' ? 'default' : 'outline'}
            onClick={() => setViewMode('week')}
            size="sm"
          >
            Week
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarDays className="h-5 w-5 mr-2" />
                Care Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
                modifiers={{
                  hasEvents: hasEvents,
                }}
                modifiersStyles={{
                  hasEvents: { 
                    backgroundColor: '#dbeafe', 
                    color: '#1d4ed8',
                    fontWeight: 'bold'
                  },
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {format(selectedDate, 'MMMM d, yyyy')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {getSelectedDateEvents().length > 0 ? (
                <div className="space-y-3">
                  {getSelectedDateEvents().map((event) => (
                    <div key={event.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={
                          event.type === 'medication' ? 'default' :
                          event.type === 'appointment' ? 'secondary' : 'outline'
                        }>
                          {event.type}
                        </Badge>
                        <Badge variant={
                          event.status === 'completed' ? 'default' :
                          event.status === 'pending' ? 'secondary' : 'destructive'
                        }>
                          {event.status}
                        </Badge>
                      </div>
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs text-gray-600">Patient: {event.patient}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No events scheduled for this date
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {events.filter(e => e.status === 'pending').slice(0, 3).map((event) => (
                <div key={event.id} className="flex items-center space-x-3 p-2 border rounded">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-gray-600">{event.patient}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
