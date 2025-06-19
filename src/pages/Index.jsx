import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Heart, Shield, Calendar, Camera, Users, Clock, Plus, CheckCircle, AlertTriangle, TrendingUp, Settings, LogOut, Pill, Timer, Facebook, Instagram, Twitter } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useMedications } from "@/hooks/useMedications";
import { useCaretaker } from "@/hooks/useCaretaker";
import { useSocket } from "@/hooks/useSocket";
import { AddMedicationDialog } from "@/components/AddMedicationDialog";
import { MedicationLogDialog } from "@/components/MedicationLogDialog";
import { PhotoUpload } from "@/components/PhotoUpload";
import { MedicationCalendar } from "@/components/MedicationCalendar";
import { Overview } from "@/components/caretaker/Overview";
import { RecentActivity } from "@/components/caretaker/RecentActivity";
import { CalendarView } from "@/components/caretaker/CalendarView";
import { Notifications } from "@/components/caretaker/Notifications";

const Index = () => {
  const { user, login, signup, logout } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      toast({
        title: `Welcome back, ${user.name}!`,
        description: `Logged in as ${user.role}`,
      });
    }
  }, [user]);

  if (user) {
    if (user.role === 'patient') {
      return <PatientDashboard user={user} logout={logout} />;
    } else {
      return <CaretakerDashboard user={user} logout={logout} />;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8 md:mb-16">
          {/* Unique Logo Design */}
          <div className="flex items-center justify-center mb-6 md:mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-4 md:p-8 rounded-full shadow-2xl border border-purple-500/30">
                <div className="flex items-center space-x-2">
                  <Pill className="h-6 w-6 md:h-10 md:w-10 text-cyan-400" />
                  <Heart className="h-5 w-5 md:h-8 md:w-8 text-pink-400 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-7xl font-black mb-4 md:mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              DoseBuddy
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed font-light px-4">
            Revolutionary medication management with AI-powered insights, 
            seamless photo verification, and comprehensive care coordination.
          </p>
          
          {/* Unique Features Grid */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16 px-4">
            <div className="group relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-4 md:p-8 rounded-3xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 md:p-4 rounded-2xl w-12 h-12 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-6 w-6 md:h-10 md:w-10 text-white" />
                </div>
                <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-4 text-white">Advanced Security</h3>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed">Military-grade encryption with biometric authentication ensures your health data remains completely private and secure</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-4 md:p-8 rounded-3xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 p-3 md:p-4 rounded-2xl w-12 h-12 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Camera className="h-6 w-6 md:h-10 md:w-10 text-white" />
                </div>
                <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-4 text-white">Smart Verification</h3>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed">AI-powered photo recognition with instant caretaker alerts and comprehensive medication tracking analytics</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-4 md:p-8 rounded-3xl border border-slate-700/50 hover:border-pink-500/50 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-3 md:p-4 rounded-2xl w-12 h-12 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-6 w-6 md:h-10 md:w-10 text-white" />
                </div>
                <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-4 text-white">Care Network</h3>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed">Connect seamlessly with healthcare providers, family members, and care teams for comprehensive health management</p>
              </div>
            </div>
          </div>
        </div>

        {/* Authentication Design */}
        <div className="max-w-2xl mx-auto px-4">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 md:mb-12 bg-slate-800/50 backdrop-blur-xl p-2 rounded-2xl border border-slate-700">
              <TabsTrigger value="login" className="text-sm md:text-lg py-3 md:py-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300">
                Access Account
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-sm md:text-lg py-3 md:py-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300">
                Join Platform
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <LoginForm onLogin={login} />
            </TabsContent>
            
            <TabsContent value="signup">
              <SignupForm onSignup={signup} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Social Media Footer */}
        <div className="mt-12 md:mt-20 text-center">
          <div className="flex justify-center space-x-6 mb-8">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="group p-3 md:p-4 bg-slate-800/60 backdrop-blur-xl rounded-full border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:scale-110">
              <Facebook className="h-5 w-5 md:h-6 md:w-6 text-slate-400 group-hover:text-blue-500 transition-colors" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="group p-3 md:p-4 bg-slate-800/60 backdrop-blur-xl rounded-full border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:scale-110">
              <Twitter className="h-5 w-5 md:h-6 md:w-6 text-slate-400 group-hover:text-cyan-500 transition-colors" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group p-3 md:p-4 bg-slate-800/60 backdrop-blur-xl rounded-full border border-slate-700 hover:border-pink-500 transition-all duration-300 hover:scale-110">
              <Instagram className="h-5 w-5 md:h-6 md:w-6 text-slate-400 group-hover:text-pink-500 transition-colors" />
            </a>
          </div>
          <p className="text-slate-400 text-sm">Connect with us on social media for updates and support</p>
        </div>
      </div>
    </div>
  );
};

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onLogin(email, password, role);
    } catch (error) {
      console.error('Login failed:', error);
    }
    setIsLoading(false);
  };

  return (
    <Card className="shadow-2xl border-0 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700">
      <CardHeader className="text-center pb-6 md:pb-8">
        <CardTitle className="text-2xl md:text-3xl text-white font-bold">Welcome Back</CardTitle>
        <CardDescription className="text-base md:text-lg text-slate-300">Access your health management dashboard</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm md:text-base font-medium text-slate-200">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-10 md:h-12 text-sm md:text-base bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm md:text-base font-medium text-slate-200">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-10 md:h-12 text-sm md:text-base bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
            />
          </div>
          <div className="space-y-3">
            <Label className="text-sm md:text-base font-medium text-slate-200">Account Type</Label>
            <div className="flex gap-2 md:gap-3">
              <Button
                type="button"
                variant={role === 'patient' ? 'default' : 'outline'}
                onClick={() => setRole('patient')}
                className={`flex-1 h-10 md:h-12 text-sm md:text-base transition-all duration-300 ${
                  role === 'patient' 
                    ? 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white shadow-lg' 
                    : 'border-slate-600 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <Pill className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Patient
              </Button>
              <Button
                type="button"
                variant={role === 'caretaker' ? 'default' : 'outline'}
                onClick={() => setRole('caretaker')}
                className={`flex-1 h-10 md:h-12 text-sm md:text-base transition-all duration-300 ${
                  role === 'caretaker' 
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-lg' 
                    : 'border-slate-600 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <Users className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Caretaker
              </Button>
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full h-10 md:h-12 text-sm md:text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg transition-all duration-300 hover:scale-105" 
            disabled={isLoading}
          >
            {isLoading ? 'Accessing...' : 'Access Dashboard'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const SignupForm = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSignup(name, email, password, role);
    } catch (error) {
      console.error('Signup failed:', error);
    }
    setIsLoading(false);
  };

  return (
    <Card className="shadow-2xl border-0 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700">
      <CardHeader className="text-center pb-6 md:pb-8">
        <CardTitle className="text-2xl md:text-3xl text-white font-bold">Join DoseBuddy</CardTitle>
        <CardDescription className="text-base md:text-lg text-slate-300">Start your smart health journey today</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm md:text-base font-medium text-slate-200">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-10 md:h-12 text-sm md:text-base bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm md:text-base font-medium text-slate-200">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-10 md:h-12 text-sm md:text-base bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm md:text-base font-medium text-slate-200">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-10 md:h-12 text-sm md:text-base bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-500"
            />
          </div>
          <div className="space-y-3">
            <Label className="text-sm md:text-base font-medium text-slate-200">Account Type</Label>
            <div className="flex gap-2 md:gap-3">
              <Button
                type="button"
                variant={role === 'patient' ? 'default' : 'outline'}
                onClick={() => setRole('patient')}
                className={`flex-1 h-10 md:h-12 text-sm md:text-base transition-all duration-300 ${
                  role === 'patient' 
                    ? 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white shadow-lg' 
                    : 'border-slate-600 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <Pill className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Patient
              </Button>
              <Button
                type="button"
                variant={role === 'caretaker' ? 'default' : 'outline'}
                onClick={() => setRole('caretaker')}
                className={`flex-1 h-10 md:h-12 text-sm md:text-base transition-all duration-300 ${
                  role === 'caretaker' 
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-lg' 
                    : 'border-slate-600 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <Users className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Caretaker
              </Button>
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full h-10 md:h-12 text-sm md:text-base font-semibold bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 shadow-lg transition-all duration-300 hover:scale-105" 
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const PatientDashboard = ({ user, logout }) => {
  const { medications, toggleMedication, addMedication, loading } = useMedications();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showLogDialog, setShowLogDialog] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [activeTab, setActiveTab] = useState('medications');
  const { toast } = useToast();
  
  useSocket(user?.id);

  const adherenceRate = medications.length > 0 
    ? Math.round((medications.filter(m => m.taken).length / medications.length) * 100)
    : 0;

  const todaysTaken = medications.filter(m => m.taken).length;
  const todaysTotal = medications.length;

  const handleToggleMedication = async (id) => {
    await toggleMedication(id);
    toast({
      title: "Medication updated",
      description: "Your medication log has been updated successfully",
    });
  };

  const handleViewLog = (medication) => {
    setSelectedMedication(medication);
    setShowLogDialog(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full mr-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">DoseBuddy</h1>
                <p className="text-gray-600 text-lg">Welcome back, {user.name}!</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-lg px-6 py-2 bg-green-100 text-green-800">
                <TrendingUp className="h-4 w-4 mr-2" />
                {adherenceRate}% Adherence
              </Badge>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="medications">Today's Medications</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="upload">Photo Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="medications">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Enhanced Stats Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center text-xl">
                      <Calendar className="h-6 w-6 mr-3 text-blue-600" />
                      Today's Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <div className="text-5xl font-bold text-green-600 mb-2">{adherenceRate}%</div>
                      <p className="text-gray-600 text-lg">Adherence Rate</p>
                      <div className="bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${adherenceRate}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        {todaysTaken} of {todaysTotal} medications taken
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center text-xl">
                      <Clock className="h-6 w-6 mr-3 text-purple-600" />
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Medications</span>
                      <span className="font-bold text-xl">{medications.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Taken Today</span>
                      <span className="font-bold text-xl text-green-600">{todaysTaken}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pending</span>
                      <span className="font-bold text-xl text-orange-600">{todaysTotal - todaysTaken}</span>
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  onClick={() => setShowAddDialog(true)}
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Medication
                </Button>
              </div>

              {/* Enhanced Medications List */}
              <div className="lg:col-span-3">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl">Today's Medications</CardTitle>
                    <CardDescription className="text-lg">Track your daily medication schedule</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600">Loading medications...</p>
                      </div>
                    ) : medications.length === 0 ? (
                      <div className="text-center py-12">
                        <Pill className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No medications yet</h3>
                        <p className="text-gray-500 mb-6">Start by adding your first medication</p>
                        <Button onClick={() => setShowAddDialog(true)} className="bg-blue-600 hover:bg-blue-700">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Your First Medication
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {medications.map((med) => (
                          <div key={med.id} className="flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:shadow-md">
                            <div className="flex items-center space-x-6">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                med.taken ? 'bg-green-500' : 'bg-gray-300'
                              }`}>
                                {med.taken && <CheckCircle className="h-4 w-4 text-white" />}
                              </div>
                              <div>
                                <h3 className="font-semibold text-xl text-gray-800">{med.name}</h3>
                                <p className="text-gray-600 text-lg">{med.dosage} • {med.frequency}</p>
                                <div className="flex items-center mt-2 text-sm text-gray-500">
                                  <Timer className="h-4 w-4 mr-1" />
                                  <span>{med.time || 'No time set'}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewLog(med)}
                              >
                                <Camera className="h-4 w-4 mr-2" />
                                View Log
                              </Button>
                              <Button
                                variant={med.taken ? "default" : "outline"}
                                onClick={() => handleToggleMedication(med.id)}
                                className="min-w-[120px] h-10"
                              >
                                {med.taken ? (
                                  <>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Taken ✓
                                  </>
                                ) : (
                                  'Mark Taken'
                                )}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calendar">
            <MedicationCalendar medications={medications} />
          </TabsContent>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Medication Proof Upload</CardTitle>
                <CardDescription>
                  Upload photos to verify your medication intake and keep your caretakers informed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PhotoUpload 
                  onUpload={(file) => {
                    console.log('Photo uploaded:', file.name);
                    toast({
                      title: "Photo uploaded successfully",
                      description: "Your medication proof has been saved and caretakers have been notified",
                    });
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <AddMedicationDialog 
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAdd={addMedication}
      />

      <MedicationLogDialog
        open={showLogDialog}
        onOpenChange={setShowLogDialog}
        medication={selectedMedication}
      />
    </div>
  );
};

const CaretakerDashboard = ({ user, logout }) => {
  const { patients, loading } = useCaretaker();
  const [activeSection, setActiveSection] = useState('overview');
  
  useSocket(user?.id);

  const averageAdherence = patients.length > 0 
    ? Math.round(patients.reduce((acc, p) => acc + p.adherence, 0) / patients.length)
    : 0;

  const patientsNeedingAttention = patients.filter(p => p.status === 'needs attention').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full mr-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">DoseBuddy Caretaker</h1>
                <p className="text-gray-600 text-lg">Welcome back, {user.name}!</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-lg px-6 py-2 bg-purple-100 text-purple-800">
                <Users className="h-4 w-4 mr-2" />
                {patients.length} Patients
              </Badge>
              {patientsNeedingAttention > 0 && (
                <Badge variant="destructive" className="text-lg px-6 py-2">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  {patientsNeedingAttention} Need Attention
                </Badge>
              )}
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeSection} onValueChange={setActiveSection}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Overview patients={patients} />
          </TabsContent>

          <TabsContent value="activity">
            <RecentActivity patients={patients} />
          </TabsContent>

          <TabsContent value="calendar">
            <CalendarView patients={patients} />
          </TabsContent>

          <TabsContent value="notifications">
            <Notifications patients={patients} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
