import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Calendar, Users, Star, Phone, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import ChatBot from '@/components/ChatBot';

const GovernmentColleges = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedStream, setSelectedStream] = useState('all');

  const colleges = [
    {
      name: 'Government College of Engineering',
      location: 'Pune, Maharashtra',
      type: 'Engineering',
      established: 1854,
      rating: 4.2,
      courses: ['B.Tech Computer Science', 'B.Tech Mechanical', 'B.Tech Civil', 'B.Tech Electrical'],
      fees: '₹50,000/year',
      admissionDate: '2024-06-15',
      facilities: ['Library', 'Hostel', 'Labs', 'Sports Complex', 'Cafeteria'],
      contact: '+91-20-2507-2000',
      website: 'www.coep.org.in',
      seats: 480
    },
    {
      name: 'Delhi College of Arts and Commerce',
      location: 'New Delhi, Delhi',
      type: 'Arts & Commerce',
      established: 1967,
      rating: 4.1,
      courses: ['B.A. English', 'B.Com', 'B.A. Psychology', 'B.A. Political Science'],
      fees: '₹15,000/year',
      admissionDate: '2024-07-01',
      facilities: ['Library', 'Computer Lab', 'Auditorium', 'Sports Ground'],
      contact: '+91-11-2766-7000',
      website: 'www.dcac.du.ac.in',
      seats: 1200
    },
    {
      name: 'Government Medical College',
      location: 'Thiruvananthapuram, Kerala',
      type: 'Medical',
      established: 1951,
      rating: 4.5,
      courses: ['MBBS', 'BDS', 'B.Sc. Nursing', 'B.Pharma'],
      fees: '₹25,000/year',
      admissionDate: '2024-08-15',
      facilities: ['Hospital', 'Research Labs', 'Library', 'Hostel', 'Simulation Center'],
      contact: '+91-471-252-8300',
      website: 'www.gmctvm.ac.in',
      seats: 150
    },
    {
      name: 'Indian Institute of Technology',
      location: 'Bombay, Maharashtra',
      type: 'Engineering',
      established: 1958,
      rating: 4.8,
      courses: ['B.Tech All Branches', 'M.Tech', 'PhD'],
      fees: '₹2,50,000/year',
      admissionDate: '2024-06-01',
      facilities: ['Research Centers', 'Hostels', 'Sports Complex', 'Library', 'Innovation Lab'],
      contact: '+91-22-2572-2545',
      website: 'www.iitb.ac.in',
      seats: 900
    },
    {
      name: 'Presidency College',
      location: 'Kolkata, West Bengal',
      type: 'Arts & Science',
      established: 1817,
      rating: 4.3,
      courses: ['B.Sc. Physics', 'B.A. History', 'B.Sc. Chemistry', 'B.A. Economics'],
      fees: '₹12,000/year',
      admissionDate: '2024-06-30',
      facilities: ['Historic Library', 'Science Labs', 'Auditorium', 'Museum'],
      contact: '+91-33-2241-3900',
      website: 'www.presidencyuniversity.ac.in',
      seats: 800
    }
  ];

  const states = [
    'Maharashtra', 'Delhi', 'Kerala', 'West Bengal', 'Karnataka', 'Tamil Nadu', 
    'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'Madhya Pradesh'
  ];

  const streams = ['Engineering', 'Medical', 'Arts & Commerce', 'Arts & Science', 'Pure Science'];

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.courses.some(course => course.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesState = selectedState === 'all' || college.location.includes(selectedState);
    const matchesStream = selectedStream === 'all' || college.type === selectedStream;
    
    return matchesSearch && matchesState && matchesStream;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('colleges.title', 'Government Colleges Directory')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('colleges.subtitle', 'Find government colleges near you with course details and admission information')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search colleges or courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {states.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedStream} onValueChange={setSelectedStream}>
            <SelectTrigger>
              <SelectValue placeholder="Select Stream" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Streams</SelectItem>
              {streams.map(stream => (
                <SelectItem key={stream} value={stream}>{stream}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6">
          {filteredColleges.map((college, index) => (
            <Card key={index} className="shadow-soft hover:shadow-medium transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{college.name}</CardTitle>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {college.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {college.rating}
                      </div>
                      <Badge variant="outline">{college.type}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Available Courses</h4>
                    <div className="space-y-1">
                      {college.courses.map((course, idx) => (
                        <Badge key={idx} variant="secondary" className="mr-2 mb-1">
                          {course}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Annual Fees:</span>
                        <span className="font-semibold text-primary">{college.fees}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Seats:</span>
                        <span className="font-semibold">{college.seats}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Established:</span>
                        <span className="font-semibold">{college.established}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Facilities</h4>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {college.facilities.map((facility, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-accent/10 rounded">
                        <Calendar className="h-4 w-4 text-primary" />
                        <div>
                          <span className="text-sm font-medium">Admission Date</span>
                          <p className="text-sm text-muted-foreground">{college.admissionDate}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Phone className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Globe className="h-4 w-4 mr-1" />
                          Website
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredColleges.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No colleges found matching your criteria.</p>
          </div>
        )}
      </main>
      
      <ChatBot />
    </div>
  );
};

export default GovernmentColleges;