import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Bell, CheckCircle, AlertCircle, BookOpen, GraduationCap, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import ChatBot from '@/components/ChatBot';

const TimelineTracker = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');

  const events = [
    {
      id: 1,
      title: 'JEE Main 2024 Registration',
      date: '2024-03-15',
      category: 'exam',
      type: 'registration',
      priority: 'high',
      description: 'Last date for JEE Main registration',
      status: 'upcoming',
      daysLeft: 15,
      relatedTo: 'Engineering Entrance'
    },
    {
      id: 2,
      title: 'NEET 2024 Application',
      date: '2024-03-20',
      category: 'exam',
      type: 'application',
      priority: 'high',
      description: 'NEET application deadline',
      status: 'upcoming',
      daysLeft: 20,
      relatedTo: 'Medical Entrance'
    },
    {
      id: 3,
      title: 'CBSE Board Exam Results',
      date: '2024-05-15',
      category: 'result',
      type: 'announcement',
      priority: 'medium',
      description: 'CBSE Class 12 results declaration',
      status: 'upcoming',
      daysLeft: 76,
      relatedTo: 'Board Exams'
    },
    {
      id: 4,
      title: 'DU Admission Process Begins',
      date: '2024-06-01',
      category: 'admission',
      type: 'process',
      priority: 'high',
      description: 'Delhi University admission portal opens',
      status: 'upcoming',
      daysLeft: 93,
      relatedTo: 'University Admission'
    },
    {
      id: 5,
      title: 'National Scholarship Portal',
      date: '2024-04-30',
      category: 'scholarship',
      type: 'deadline',
      priority: 'medium',
      description: 'Last date for scholarship applications',
      status: 'upcoming',
      daysLeft: 61,
      relatedTo: 'Financial Aid'
    },
    {
      id: 6,
      title: 'IIT Counselling Round 1',
      date: '2024-07-15',
      category: 'counselling',
      type: 'process',
      priority: 'high',
      description: 'First round of IIT seat allocation',
      status: 'upcoming',
      daysLeft: 137,
      relatedTo: 'Engineering Counselling'
    }
  ];

  const categories = {
    all: { label: 'All Events', icon: Calendar },
    exam: { label: 'Exams', icon: FileText },
    admission: { label: 'Admissions', icon: GraduationCap },
    scholarship: { label: 'Scholarships', icon: BookOpen },
    counselling: { label: 'Counselling', icon: CheckCircle },
    result: { label: 'Results', icon: AlertCircle }
  };

  const filteredEvents = activeCategory === 'all' 
    ? events 
    : events.filter(event => event.category === activeCategory);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/10 text-destructive';
      case 'medium': return 'bg-warning/10 text-warning';
      case 'low': return 'bg-success/10 text-success';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (daysLeft: number) => {
    if (daysLeft <= 7) return <AlertCircle className="h-4 w-4 text-destructive" />;
    if (daysLeft <= 30) return <Clock className="h-4 w-4 text-warning" />;
    return <Calendar className="h-4 w-4 text-success" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('timeline.title', 'Academic Timeline Tracker')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('timeline.subtitle', 'Stay updated with important dates and deadlines')}
          </p>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-6">
          <TabsList className="grid w-full grid-cols-6">
            {Object.entries(categories).map(([key, category]) => {
              const IconComponent = category.icon;
              return (
                <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        <div className="grid gap-4">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="shadow-soft hover:shadow-medium transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(event.daysLeft)}
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <Badge className={getPriorityColor(event.priority)}>
                        {event.priority.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{event.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(event.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                      <Badge variant="outline">{event.relatedTo}</Badge>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {event.daysLeft}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      days left
                    </div>
                    <Button size="sm" className="mt-2">
                      <Bell className="h-4 w-4 mr-1" />
                      Remind Me
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No events found in this category.</p>
          </div>
        )}

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
                <h4 className="font-semibold">Urgent (1-7 days)</h4>
                <p className="text-sm text-muted-foreground">Daily reminders</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
                <h4 className="font-semibold">Important (1-30 days)</h4>
                <p className="text-sm text-muted-foreground">Weekly reminders</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Calendar className="h-8 w-8 text-success mx-auto mb-2" />
                <h4 className="font-semibold">Upcoming (30+ days)</h4>
                <p className="text-sm text-muted-foreground">Monthly reminders</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <ChatBot />
    </div>
  );
};

export default TimelineTracker;