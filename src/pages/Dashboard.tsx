import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GraduationCap, User, Clock, MessageSquare, Plus, Check, X } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface Profile {
  id: string;
  full_name: string | null;
  age: number | null;
  date_of_birth: string | null;
  contact_number: string | null;
  city: string | null;
  state: string | null;
  class_level: string | null;
  interests: string[] | null;
  hobbies: string[] | null;
}

interface ChatMessage {
  id: string;
  message: string;
  is_user_message: boolean;
  created_at: string;
}

interface TimelineReminder {
  id: string;
  title: string;
  description: string | null;
  reminder_date: string;
  reminder_time: string | null;
  is_completed: boolean;
  category: string | null;
}

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [reminders, setReminders] = useState<TimelineReminder[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '',
    category: ''
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }

    if (user) {
      fetchProfile();
      fetchChatHistory();
      fetchReminders();
    }
  }, [user, loading, navigate]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      setProfile(data);
    }
  };

  const fetchChatHistory = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('chat_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error fetching chat history:', error);
    } else {
      setChatHistory(data || []);
    }
  };

  const fetchReminders = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('timeline_reminders')
      .select('*')
      .eq('user_id', user.id)
      .order('reminder_date', { ascending: true });

    if (error) {
      console.error('Error fetching reminders:', error);
    } else {
      setReminders(data || []);
    }
  };

  const addReminder = async () => {
    if (!user || !newReminder.title) return;

    const { error } = await supabase
      .from('timeline_reminders')
      .insert([{
        user_id: user.id,
        title: newReminder.title,
        description: newReminder.description,
        reminder_date: newReminder.date,
        reminder_time: newReminder.time || null,
        category: newReminder.category
      }]);

    if (error) {
      console.error('Error adding reminder:', error);
    } else {
      setNewReminder({
        title: '',
        description: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        time: '',
        category: ''
      });
      fetchReminders();
    }
  };

  const toggleReminderComplete = async (id: string, completed: boolean) => {
    const { error } = await supabase
      .from('timeline_reminders')
      .update({ is_completed: completed })
      .eq('id', id);

    if (error) {
      console.error('Error updating reminder:', error);
    } else {
      fetchReminders();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6">
        <div className="flex items-center gap-3 mb-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Student Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="" />
            <AvatarFallback>
              {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">{profile?.full_name || 'Student'}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-red-600">Student ID</h4>
                <Badge variant="outline">{user.id.substring(0, 8)}</Badge>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-red-600">Shortcuts</h4>
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    📚 University Courses
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    📝 Notes & References
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    📞 Contacts
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    ✓ Tasks
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    🔖 Bookmarks
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-red-600">To-Do List</h4>
                <div className="space-y-1">
                  {reminders.slice(0, 3).map((reminder) => (
                    <div key={reminder.id} className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-auto"
                        onClick={() => toggleReminderComplete(reminder.id, !reminder.is_completed)}
                      >
                        {reminder.is_completed ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <div className="h-4 w-4 border rounded" />
                        )}
                      </Button>
                      <span className={`text-sm ${reminder.is_completed ? 'line-through text-muted-foreground' : ''}`}>
                        {reminder.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Name</Label>
                  <p className="text-sm text-muted-foreground">{profile?.full_name || 'Not set'}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Age</Label>
                  <p className="text-sm text-muted-foreground">{profile?.age || 'Not set'}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Date of Birth</Label>
                  <p className="text-sm text-muted-foreground">
                    {profile?.date_of_birth ? format(new Date(profile.date_of_birth), 'PP') : 'Not set'}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Contact</Label>
                  <p className="text-sm text-muted-foreground">{profile?.contact_number || 'Not set'}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">City</Label>
                  <p className="text-sm text-muted-foreground">{profile?.city || 'Not set'}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">State</Label>
                  <p className="text-sm text-muted-foreground">{profile?.state || 'Not set'}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-medium">Class Level</Label>
                  <p className="text-sm text-muted-foreground">{profile?.class_level || 'Not set'}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-medium">Interests</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile?.interests?.map((interest, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    )) || <p className="text-sm text-muted-foreground">Not set</p>}
                  </div>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-medium">Hobbies</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile?.hobbies?.map((hobby, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {hobby}
                      </Badge>
                    )) || <p className="text-sm text-muted-foreground">Not set</p>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agenda */}
          <Card>
            <CardHeader>
              <CardTitle>Agenda</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="calendar" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  <TabsTrigger value="exams">Exams</TabsTrigger>
                  <TabsTrigger value="assignments">Assignments</TabsTrigger>
                </TabsList>
                <TabsContent value="calendar" className="mt-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </TabsContent>
                <TabsContent value="exams">
                  <div className="space-y-2">
                    {reminders.filter(r => r.category === 'exam').map((exam) => (
                      <div key={exam.id} className="p-2 border rounded">
                        <p className="font-medium">{exam.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(exam.reminder_date), 'PP')}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="assignments">
                  <div className="space-y-2">
                    {reminders.filter(r => r.category === 'assignment').map((assignment) => (
                      <div key={assignment.id} className="p-2 border rounded">
                        <p className="font-medium">{assignment.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(assignment.reminder_date), 'PP')}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Chat History and Timeline Tracker */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chat History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Chat History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-3">
                  {chatHistory.map((message) => (
                    <div
                      key={message.id}
                      className={`p-3 rounded-lg ${
                        message.is_user_message
                          ? 'bg-primary/10 ml-6'
                          : 'bg-muted mr-6'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(new Date(message.created_at), 'PPp')}
                      </p>
                    </div>
                  ))}
                  {chatHistory.length === 0 && (
                    <p className="text-center text-muted-foreground">No chat history yet</p>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Timeline Tracker */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Timeline Tracker
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Reminder title"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
                />
                <Textarea
                  placeholder="Description (optional)"
                  value={newReminder.description}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, description: e.target.value }))}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="date"
                    value={newReminder.date}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, date: e.target.value }))}
                  />
                  <Input
                    type="time"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>
                <Input
                  placeholder="Category (exam, assignment, etc.)"
                  value={newReminder.category}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, category: e.target.value }))}
                />
                <Button onClick={addReminder} className="w-full">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Reminder
                </Button>
              </div>

              <ScrollArea className="h-[200px]">
                <div className="space-y-2">
                  {reminders.map((reminder) => (
                    <div key={reminder.id} className="flex items-start gap-2 p-2 border rounded">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-auto mt-1"
                        onClick={() => toggleReminderComplete(reminder.id, !reminder.is_completed)}
                      >
                        {reminder.is_completed ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <div className="h-4 w-4 border rounded" />
                        )}
                      </Button>
                      <div className="flex-1">
                        <p className={`font-medium ${reminder.is_completed ? 'line-through text-muted-foreground' : ''}`}>
                          {reminder.title}
                        </p>
                        {reminder.description && (
                          <p className="text-sm text-muted-foreground">{reminder.description}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(reminder.reminder_date), 'PP')}
                          {reminder.reminder_time && ` at ${reminder.reminder_time}`}
                        </p>
                        {reminder.category && (
                          <Badge variant="outline" className="text-xs mt-1">
                            {reminder.category}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                  {reminders.length === 0 && (
                    <p className="text-center text-muted-foreground">No reminders yet</p>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;