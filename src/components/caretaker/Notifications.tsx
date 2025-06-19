
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, AlertTriangle, Clock, CheckCircle, Settings, Trash2 } from 'lucide-react';

interface Notification {
  id: string;
  type: 'urgent' | 'reminder' | 'info' | 'success';
  title: string;
  message: string;
  patient: string;
  timestamp: string;
  read: boolean;
}

interface NotificationsProps {
  patients: any[];
}

export const Notifications = ({ patients }: NotificationsProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'urgent',
      title: 'Medication Missed',
      message: 'Bob Wilson has missed his evening medication',
      patient: 'Bob Wilson',
      timestamp: '5 minutes ago',
      read: false,
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Check-in Due',
      message: 'Weekly check-in with Mary Johnson is due',
      patient: 'Mary Johnson',
      timestamp: '2 hours ago',
      read: false,
    },
    {
      id: '3',
      type: 'success',
      title: 'Goal Achieved',
      message: 'John Doe has maintained 95% adherence for 7 days',
      patient: 'John Doe',
      timestamp: '1 day ago',
      read: true,
    },
  ]);

  const [settings, setSettings] = useState({
    missedMedication: true,
    lowAdherence: true,
    photoUploads: false,
    weeklyReports: true,
    emergencyOnly: false,
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'urgent':
        return AlertTriangle;
      case 'reminder':
        return Clock;
      case 'success':
        return CheckCircle;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'urgent':
        return 'text-red-600 bg-red-100';
      case 'reminder':
        return 'text-orange-600 bg-orange-100';
      case 'success':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Bell className="h-6 w-6 text-gray-600" />
          <h2 className="text-xl font-semibold">Notifications</h2>
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount} unread</Badge>
          )}
        </div>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {notifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            return (
              <Card key={notification.id} className={`${!notification.read ? 'border-blue-200 bg-blue-50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm">{notification.title}</h3>
                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark Read
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">Patient: {notification.patient}</span>
                        <span className="text-xs text-gray-500">{notification.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="missed-med">Missed Medications</Label>
                <Switch
                  id="missed-med"
                  checked={settings.missedMedication}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, missedMedication: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="low-adherence">Low Adherence</Label>
                <Switch
                  id="low-adherence"
                  checked={settings.lowAdherence}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, lowAdherence: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="photo-uploads">Photo Uploads</Label>
                <Switch
                  id="photo-uploads"
                  checked={settings.photoUploads}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, photoUploads: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="weekly-reports">Weekly Reports</Label>
                <Switch
                  id="weekly-reports"
                  checked={settings.weeklyReports}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, weeklyReports: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Today's Alerts</span>
                <Badge variant="destructive">3</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Week</span>
                <Badge variant="secondary">12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Resolved</span>
                <Badge variant="default">8</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
