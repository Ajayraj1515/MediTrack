
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CheckCircle, Bell, Clock, Camera, User, Settings, Trash2 } from "lucide-react";

export const Notifications = ({ patients }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'Medication Missed',
      message: 'Jane Smith missed her evening blood pressure medication',
      patient: 'Jane Smith',
      time: '30 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Photo Verification',
      message: 'John Doe uploaded proof of medication intake',
      patient: 'John Doe',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Low Adherence Alert',
      message: 'Jane Smith\'s adherence dropped below 70%',
      patient: 'Jane Smith',
      time: '3 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'info',
      title: 'Patient Login',
      message: 'John Doe logged into the application',
      patient: 'John Doe',
      time: '5 hours ago',
      read: true
    }
  ]);

  const [settings, setSettings] = useState({
    criticalAlerts: true,
    medicationReminders: true,
    photoUploads: false,
    adherenceAlerts: true,
    patientActivity: false,
    emailNotifications: true,
    pushNotifications: true
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'info':
        return <User className="h-5 w-5 text-blue-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'critical':
        return 'border-l-red-500 bg-red-50';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'success':
        return 'border-l-green-500 bg-green-50';
      case 'info':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Notifications Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-2xl">
                <Bell className="h-6 w-6 mr-3" />
                Notifications
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-3">
                    {unreadCount} new
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>Stay updated with your patients' activities</CardDescription>
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                Mark All as Read
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications">Active Notifications</TabsTrigger>
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card>
            <CardContent className="p-6">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No notifications</h3>
                  <p className="text-gray-500">You're all caught up!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`flex items-start space-x-4 p-4 border-l-4 rounded-r-lg transition-all ${
                        getNotificationColor(notification.type)
                      } ${!notification.read ? 'shadow-md' : 'opacity-75'}`}
                    >
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`text-sm font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                            {notification.title}
                          </h4>
                          <div className="flex items-center space-x-2">
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {notification.patient}
                          </Badge>
                          
                          <div className="flex items-center space-x-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs"
                              >
                                Mark as Read
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="text-xs text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure when and how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Alert Types */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Alert Types</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div>
                        <Label htmlFor="critical-alerts" className="text-sm font-medium">Critical Alerts</Label>
                        <p className="text-xs text-gray-600">Missed medications, emergencies</p>
                      </div>
                    </div>
                    <Switch 
                      id="critical-alerts"
                      checked={settings.criticalAlerts}
                      onCheckedChange={(checked) => setSettings(prev => ({...prev, criticalAlerts: checked}))}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-yellow-600" />
                      <div>
                        <Label htmlFor="medication-reminders" className="text-sm font-medium">Medication Reminders</Label>
                        <p className="text-xs text-gray-600">Upcoming medication times</p>
                      </div>
                    </div>
                    <Switch 
                      id="medication-reminders"
                      checked={settings.medicationReminders}
                      onCheckedChange={(checked) => setSettings(prev => ({...prev, medicationReminders: checked}))}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Camera className="h-5 w-5 text-green-600" />
                      <div>
                        <Label htmlFor="photo-uploads" className="text-sm font-medium">Photo Uploads</Label>
                        <p className="text-xs text-gray-600">When patients upload medication proof</p>
                      </div>
                    </div>
                    <Switch 
                      id="photo-uploads"
                      checked={settings.photoUploads}
                      onCheckedChange={(checked) => setSettings(prev => ({...prev, photoUploads: checked}))}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <div>
                        <Label htmlFor="adherence-alerts" className="text-sm font-medium">Adherence Alerts</Label>
                        <p className="text-xs text-gray-600">Low adherence warnings</p>
                      </div>
                    </div>
                    <Switch 
                      id="adherence-alerts"
                      checked={settings.adherenceAlerts}
                      onCheckedChange={(checked) => setSettings(prev => ({...prev, adherenceAlerts: checked}))}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-purple-600" />
                      <div>
                        <Label htmlFor="patient-activity" className="text-sm font-medium">Patient Activity</Label>
                        <p className="text-xs text-gray-600">Login/logout notifications</p>
                      </div>
                    </div>
                    <Switch 
                      id="patient-activity"
                      checked={settings.patientActivity}
                      onCheckedChange={(checked) => setSettings(prev => ({...prev, patientActivity: checked}))}
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Methods */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Delivery Methods</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <Label htmlFor="email-notifications" className="text-sm font-medium">Email Notifications</Label>
                      <p className="text-xs text-gray-600">Receive notifications via email</p>
                    </div>
                    <Switch 
                      id="email-notifications"
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings(prev => ({...prev, emailNotifications: checked}))}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <Label htmlFor="push-notifications" className="text-sm font-medium">Push Notifications</Label>
                      <p className="text-xs text-gray-600">Browser and mobile push notifications</p>
                    </div>
                    <Switch 
                      id="push-notifications"
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => setSettings(prev => ({...prev, pushNotifications: checked}))}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full">Save Notification Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
