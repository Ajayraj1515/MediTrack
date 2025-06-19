
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface OverviewProps {
  patients: any[];
}

export const Overview = ({ patients }: OverviewProps) => {
  const totalPatients = patients.length;
  const averageAdherence = patients.length > 0 
    ? Math.round(patients.reduce((acc, p) => acc + p.adherence, 0) / patients.length)
    : 0;
  const patientsOnTrack = patients.filter(p => p.adherence >= 80).length;
  const criticalPatients = patients.filter(p => p.adherence < 70).length;

  const stats = [
    {
      title: 'Total Patients',
      value: totalPatients,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Average Adherence',
      value: `${averageAdherence}%`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'On Track',
      value: patientsOnTrack,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      title: 'Need Attention',
      value: criticalPatients,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`${stat.bgColor} p-3 rounded-lg mr-4`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Patient Adherence Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {patients.map((patient) => (
              <div key={patient.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{patient.name}</span>
                  <Badge variant={
                    patient.adherence >= 90 ? 'default' :
                    patient.adherence >= 80 ? 'secondary' : 'destructive'
                  }>
                    {patient.adherence}%
                  </Badge>
                </div>
                <Progress value={patient.adherence} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-amber-600 mr-3" />
                <div>
                  <p className="font-medium text-amber-800">Daily Check-in</p>
                  <p className="text-sm text-amber-600">Review today's medication status</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-blue-800">Patient Reports</p>
                  <p className="text-sm text-blue-600">Generate weekly adherence reports</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
