
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, CheckCircle, AlertTriangle, Clock, User } from "lucide-react";

export const CalendarView = ({ patients }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedPatient, setSelectedPatient] = useState('all');
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Mock data for calendar events
  const getEventsForDay = (day) => {
    const events = [];
    const random = Math.random();
    
    if (random > 0.7) {
      events.push({
        type: 'medication_taken',
        patient: 'John Doe',
        count: 2
      });
    }
    
    if (random > 0.8) {
      events.push({
        type: 'medication_missed',
        patient: 'Jane Smith',
        count: 1
      });
    }
    
    if (random > 0.9) {
      events.push({
        type: 'appointment',
        patient: 'John Doe',
        time: '2:00 PM'
      });
    }
    
    return events;
  };
  
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const today = new Date();
  
  const renderCalendarDay = (day) => {
    const isToday = today.getDate() === day && 
                   today.getMonth() === currentDate.getMonth() && 
                   today.getFullYear() === currentDate.getFullYear();
    
    const events = getEventsForDay(day);
    const hasEvents = events.length > 0;
    
    return (
      <div
        key={day}
        className={`p-2 min-h-[100px] border border-gray-200 hover:bg-gray-50 transition-colors ${
          isToday ? 'bg-blue-50 border-blue-200' : 'bg-white'
        }`}
      >
        <div className="flex justify-between items-start mb-2">
          <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
            {day}
          </span>
          {isToday && <Badge variant="default" className="text-xs">Today</Badge>}
        </div>
        
        {hasEvents && (
          <div className="space-y-1">
            {events.map((event, index) => (
              <div key={index} className="text-xs">
                {event.type === 'medication_taken' && (
                  <div className="flex items-center text-green-600 bg-green-100 px-1 py-0.5 rounded">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    <span>{event.count} taken</span>
                  </div>
                )}
                {event.type === 'medication_missed' && (
                  <div className="flex items-center text-red-600 bg-red-100 px-1 py-0.5 rounded">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    <span>{event.count} missed</span>
                  </div>
                )}
                {event.type === 'appointment' && (
                  <div className="flex items-center text-purple-600 bg-purple-100 px-1 py-0.5 rounded">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{event.time}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Calendar Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Patient Calendar</CardTitle>
              <CardDescription>Track medication schedules and appointments</CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patients</SelectItem>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id.toString()}>
                      {patient.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-xl font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <Button variant="outline" size="sm" onClick={() => navigateMonth(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-0 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-3 text-center font-semibold text-gray-600 bg-gray-100 border border-gray-200">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-0 border border-gray-200">
            {/* Empty cells for days before the first day of the month */}
            {Array.from({ length: firstDay }, (_, index) => (
              <div key={`empty-${index}`} className="p-2 min-h-[100px] border border-gray-200 bg-gray-50"></div>
            ))}
            
            {/* Days of the month */}
            {Array.from({ length: daysInMonth }, (_, index) => renderCalendarDay(index + 1))}
          </div>
          
          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-100 border border-green-200 mr-2 rounded"></div>
              <span>Medications Taken</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-100 border border-red-200 mr-2 rounded"></div>
              <span>Medications Missed</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-purple-100 border border-purple-200 mr-2 rounded"></div>
              <span>Appointments</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-100 border border-blue-200 mr-2 rounded"></div>
              <span>Today</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Next 7 days schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1,2,3,4].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">John Doe - Morning Medications</p>
                    <p className="text-sm text-gray-600">Tomorrow at 8:00 AM</p>
                  </div>
                </div>
                <Badge variant="outline">Scheduled</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
