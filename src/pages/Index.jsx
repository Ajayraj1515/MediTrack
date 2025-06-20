
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Pill, Plus, Clock, Calendar } from 'lucide-react';

const Index = () => {
  const [medications, setMedications] = useState([
    { id: 1, name: 'Aspirin', dosage: '100mg', frequency: 'Daily', time: '9:00 AM' },
    { id: 2, name: 'Vitamin D', dosage: '1000IU', frequency: 'Daily', time: '6:00 PM' }
  ]);

  const [newMed, setNewMed] = useState({
    name: '',
    dosage: '',
    frequency: '',
    time: ''
  });

  const addMedication = (e) => {
    e.preventDefault();
    if (newMed.name && newMed.dosage) {
      setMedications([
        ...medications,
        {
          id: Date.now(),
          ...newMed
        }
      ]);
      setNewMed({ name: '', dosage: '', frequency: '', time: '' });
    }
  };

  const handleInputChange = (e) => {
    setNewMed({
      ...newMed,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Pill className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Medication Tracker</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="medications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="medications">My Medications</TabsTrigger>
            <TabsTrigger value="add">Add Medication</TabsTrigger>
          </TabsList>

          <TabsContent value="medications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Pill className="h-5 w-5 mr-2" />
                  Current Medications
                </CardTitle>
                <CardDescription>
                  Manage your daily medications and schedules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medications.map((med) => (
                    <div key={med.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{med.name}</h3>
                        <p className="text-gray-600">{med.dosage}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="secondary" className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {med.frequency}
                          </Badge>
                          {med.time && (
                            <Badge variant="outline" className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {med.time}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Take Now
                      </Button>
                    </div>
                  ))}
                  {medications.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Pill className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No medications added yet.</p>
                      <p>Click "Add Medication" to get started.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Add New Medication
                </CardTitle>
                <CardDescription>
                  Add a new medication to your daily routine
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={addMedication} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Medication Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g., Aspirin"
                      value={newMed.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dosage">Dosage</Label>
                    <Input
                      id="dosage"
                      name="dosage"
                      placeholder="e.g., 100mg"
                      value={newMed.dosage}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <Input
                      id="frequency"
                      name="frequency"
                      placeholder="e.g., Daily, Twice daily"
                      value={newMed.frequency}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={newMed.time}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Medication
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
