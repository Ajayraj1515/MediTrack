
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle, Clock, Pill } from "lucide-react";

export const MedicationCalendar = ({ medications }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
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
  
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const today = new Date();
  
  // Mock medication data for different days
  const getMedicationDataForDay = (day) => {
    const total = medications.length;
    const taken = Math.floor(Math.random() * (total + 1));
    return { total, taken };
  };
  
  const renderCalendarDay = (day) => {
    const isToday = today.getDate() === day && 
                   today.getMonth() === currentDate.getMonth() && 
                   today.getFullYear() === currentDate.getFullYear();
    
    const dayData = getMedicationDataForDay(day);
    const adherenceRate = dayData.total > 0 ? (dayData.taken / dayData.total) * 100 : 0;
    
    let dayColor = 'bg-gray-50';
    if (adherenceRate === 100) dayColor = 'bg-green-100';
    else if (adherenceRate >= 75) dayColor = 'bg-yellow-100';
    else if (adherenceRate > 0) dayColor = 'bg-orange-100';
    else if (dayData.total > 0) dayColor = 'bg-red-100';
    
    return (
      <div
        key={day}
        className={`p-2 min-h-[80px] border border-gray-200 ${dayColor} ${
          isToday ? 'ring-2 ring-blue-500' : ''
        }`}
      >
        <div className="flex justify-between items-start mb-1">
          <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
            {day}
          </span>
          {isToday && <Badge variant="default" className="text-xs">Today</Badge>}
        </div>
        
        {dayData.total > 0 && (
          <div className="space-y-1">
            <div className="flex items-center text-xs text-gray-600">
              <Pill className="h-3 w-3 mr-1" />
              {dayData.total} meds
            </div>
            <div className="flex items-center text-xs">
              {dayData.taken === dayData.total ? (
                <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
              ) : (
                <Clock className="h-3 w-3 text-orange-600 mr-1" />
              )}
              <span className={adherenceRate === 100 ? 'text-green-600' : 'text-orange-600'}>
                {dayData.taken}/{dayData.total}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Medication Calendar</CardTitle>
            <CardDescription>Track your daily medication adherence</CardDescription>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-lg font-semibold min-w-[200px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <Button variant="outline" size="sm" onClick={() => navigateMonth(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-0 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-3 text-center font-semibold text-gray-600 bg-gray-100 border border-gray-200">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-0">
          {/* Empty cells for days before the first day of the month */}
          {Array.from({ length: firstDay }, (_, index) => (
            <div key={`empty-${index}`} className="p-2 min-h-[80px] border border-gray-200 bg-gray-50"></div>
          ))}
          
          {/* Days of the month */}
          {Array.from({ length: daysInMonth }, (_, index) => renderCalendarDay(index + 1))}
        </div>
        
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-100 border border-gray-200 mr-2"></div>
            <span>100% Adherence</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-100 border border-gray-200 mr-2"></div>
            <span>75-99% Adherence</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-orange-100 border border-gray-200 mr-2"></div>
            <span>1-74% Adherence</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-100 border border-gray-200 mr-2"></div>
            <span>0% Adherence</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-50 border border-gray-200 mr-2"></div>
            <span>No Medications</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
