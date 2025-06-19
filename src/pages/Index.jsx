
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { Overview } from '@/components/caretaker/Overview';
import { RecentActivity } from '@/components/caretaker/RecentActivity';
import { CalendarView } from '@/components/caretaker/CalendarView';
import { Notifications } from '@/components/caretaker/Notifications';
import { Pill, Heart, Shield, Users, Facebook, Twitter, Instagram } from 'lucide-react';

const Index = () => {
  const { user, login, logout, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  // Mock patient data
  const mockPatients = [
    { id: 1, name: 'John Doe', age: 65, medications: 3, adherence: 85 },
    { id: 2, name: 'Mary Johnson', age: 72, medications: 5, adherence: 92 },
    { id: 3, name: 'Bob Wilson', age: 58, medications: 2, adherence: 78 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login(formData.email, formData.password);
    } else {
      register(formData.name, formData.email, formData.password);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center items-center mb-4 sm:mb-6">
              <Pill className="h-8 w-8 sm:h-12 sm:w-12 text-blue-600 mr-2 sm:mr-3" />
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold gradient-text">
                MediaTrack
              </h1>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">
              Smart medication management and tracking platform for better health outcomes
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <Card className="card-hover bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Heart className="h-8 w-8 sm:h-12 sm:w-12 text-red-500 mx-auto mb-4" />
                <CardTitle className="text-lg sm:text-xl">Health Monitoring</CardTitle>
                <CardDescription>
                  Track medication adherence and health metrics in real-time
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-hover bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Shield className="h-8 w-8 sm:h-12 sm:w-12 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-lg sm:text-xl">Safe & Secure</CardTitle>
                <CardDescription>
                  Your health data is protected with enterprise-grade security
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-hover bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Users className="h-8 w-8 sm:h-12 sm:w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-lg sm:text-xl">Family Care</CardTitle>
                <CardDescription>
                  Connect with caregivers and family for comprehensive support
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Auth Section */}
          <div className="max-w-md mx-auto">
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-center">
                  {isLogin ? 'Access Account' : 'Join Platform'}
                </CardTitle>
                <CardDescription className="text-center">
                  {isLogin ? 'Sign in to your MediaTrack account' : 'Create your MediaTrack account'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </Button>
                </form>
                
                <Separator className="my-4" />
                
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer with Social Media */}
        <footer className="bg-white/80 backdrop-blur-sm border-t mt-8 sm:mt-16">
          <div className="container mx-auto px-4 py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex items-center">
                <Pill className="h-6 w-6 text-blue-600 mr-2" />
                <span className="text-lg font-semibold text-gray-800">MediaTrack</span>
              </div>
              
              <div className="flex space-x-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600 transition-colors"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-800 transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
            
            <div className="text-center mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                © 2024 MediaTrack. All rights reserved. Smart medication management for better health.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Pill className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">MediaTrack</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.name}</span>
              <Button onClick={logout} variant="outline" size="sm">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Overview patients={mockPatients} />
          </TabsContent>

          <TabsContent value="calendar">
            <CalendarView patients={mockPatients} />
          </TabsContent>

          <TabsContent value="activity">
            <RecentActivity patients={mockPatients} />
          </TabsContent>

          <TabsContent value="notifications">
            <Notifications patients={mockPatients} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
