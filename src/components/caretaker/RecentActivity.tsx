
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, CheckCircle, AlertTriangle, Camera, MessageSquare } from 'lucide-react';

interface Activity {
  id: string;
  type: 'medication_taken' | 'medication_missed' | 'photo_uploaded' | 'message_sent';
  patient: string;
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'info';
}

interface RecentActivityProps {
  patients: any[];
}

export const RecentActivity = ({ patients }: RecentActivityProps) => {
  // Mock activity data
  const activities: Activity[] = [
    {
      id: '1',
      type: 'medication_taken',
      patient: 'John Doe',
      description: 'Took Vitamin D (1000 IU)',
      timestamp: '2 minutes ago',
      status: 'success',
    },
    {
      id: '2',
      type: 'photo_uploaded',
      patient: 'Mary Johnson',
      description: 'Uploaded medication proof photo',
      timestamp: '15 minutes ago',
      status: 'info',
    },
    {
      id: '3',
      type: 'medication_missed',
      patient: 'Bob Wilson',
      description: 'Missed evening medication',
      timestamp: '1 hour ago',
      status: 'warning',
    },
    {
      id: '4',
      type: 'message_sent',
      patient: 'John Doe',
      description: 'Sent a message about side effects',
      timestamp: '2 hours ago',
      status: 'info',
    },
  ];

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'medication_taken':
        return CheckCircle;
      case 'medication_missed':
        return AlertTriangle;
      case 'photo_uploaded':
        return Camera;
      case 'message_sent':
        return MessageSquare;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: Activity['status']) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-orange-600 bg-orange-100';
      case 'info':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Today's Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Medications Taken</span>
              <span className="font-bold text-green-600">18/24</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Photos Uploaded</span>
              <span className="font-bold text-blue-600">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Missed Doses</span>
              <span className="font-bold text-red-600">3</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Response Times</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg Response</span>
              <Badge variant="default">2.3 min</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Fastest</span>
              <Badge variant="secondary">45 sec</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Slowest</span>
              <Badge variant="outline">8.2 min</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Engagement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Patients</span>
              <span className="font-bold text-blue-600">{patients.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Messages</span>
              <span className="font-bold text-purple-600">7</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Alerts</span>
              <span className="font-bold text-orange-600">2</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="flex items-start space-x-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {activity.patient.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{activity.patient}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{activity.timestamp}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
