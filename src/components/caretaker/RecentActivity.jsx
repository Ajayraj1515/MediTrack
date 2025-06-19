
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle, AlertTriangle, Camera, Clock, Pill, User } from "lucide-react";

export const RecentActivity = ({ patients }) => {
  // Mock activity data
  const activities = [
    {
      id: 1,
      type: 'medication_taken',
      patient: 'John Doe',
      medication: 'Aspirin 100mg',
      time: '2 hours ago',
      hasPhoto: true
    },
    {
      id: 2,
      type: 'medication_missed', 
      patient: 'Jane Smith',
      medication: 'Vitamin D 1000 IU',
      time: '4 hours ago',
      hasPhoto: false
    },
    {
      id: 3,
      type: 'medication_taken',
      patient: 'John Doe', 
      medication: 'Vitamin D 1000 IU',
      time: '1 day ago',
      hasPhoto: true
    },
    {
      id: 4,
      type: 'patient_login',
      patient: 'Jane Smith',
      time: '1 day ago'
    },
    {
      id: 5,
      type: 'medication_added',
      patient: 'John Doe',
      medication: 'Blood pressure medication',
      time: '2 days ago'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'medication_taken':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'medication_missed':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'patient_login':
        return <User className="h-4 w-4 text-blue-600" />;
      case 'medication_added':
        return <Pill className="h-4 w-4 text-purple-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityDescription = (activity) => {
    switch (activity.type) {
      case 'medication_taken':
        return `took ${activity.medication}`;
      case 'medication_missed':
        return `missed ${activity.medication}`;
      case 'patient_login':
        return 'logged into the app';
      case 'medication_added':
        return `added ${activity.medication}`;
      default:
        return 'had activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'medication_taken':
        return 'border-l-green-500 bg-green-50';
      case 'medication_missed':
        return 'border-l-red-500 bg-red-50';
      case 'patient_login':
        return 'border-l-blue-500 bg-blue-50';
      case 'medication_added':
        return 'border-l-purple-500 bg-purple-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity Feed</CardTitle>
          <CardDescription>Real-time updates from all your patients</CardDescription>
        </CardHeader>
        <CardContent>
          {activities.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No recent activity</h3>
              <p className="text-gray-500">Patient activities will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div 
                  key={activity.id} 
                  className={`flex items-start space-x-4 p-4 border-l-4 rounded-r-lg ${getActivityColor(activity.type)}`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {activity.patient.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-sm">{activity.patient}</span>
                      <span className="text-sm text-gray-600">{getActivityDescription(activity)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{activity.time}</span>
                      {activity.hasPhoto && (
                        <Badge variant="outline" className="text-xs">
                          <Camera className="h-3 w-3 mr-1" />
                          Photo
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Activity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Today's Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Medications Taken</span>
                <span className="font-semibold text-green-600">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Medications Missed</span>
                <span className="font-semibold text-red-600">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Photos Uploaded</span>
                <span className="font-semibold text-blue-600">6</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Activities</span>
                <span className="font-semibold">47</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Adherence</span>
                <span className="font-semibold text-green-600">82%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Patient Logins</span>
                <span className="font-semibold text-purple-600">14</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Critical Alerts</span>
                <span className="font-semibold text-red-600">1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Warnings</span>
                <span className="font-semibold text-yellow-600">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Resolved</span>
                <span className="font-semibold text-green-600">12</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
