import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, BookOpen, Briefcase, GraduationCap, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import ChatBot from '@/components/ChatBot';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const CourseMapping = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const courseData = [
    {
      degree: 'B.Sc. Computer Science',
      duration: '3 years',
      careers: ['Software Developer', 'Data Scientist', 'Cybersecurity Analyst', 'AI Engineer'],
      government: ['IT Officer', 'Technical Assistant', 'Computer Programmer'],
      private: ['Software Engineer', 'Product Manager', 'Tech Lead', 'Startup Founder'],
      salary: { entry: '₹3-6 LPA', peak: '₹15-50 LPA' },
      growth: 85
    },
    {
      degree: 'B.Com',
      duration: '3 years',
      careers: ['Accountant', 'Financial Analyst', 'Bank Manager', 'CA'],
      government: ['Bank PO', 'Income Tax Officer', 'Auditor'],
      private: ['Financial Analyst', 'Investment Banker', 'Business Analyst'],
      salary: { entry: '₹2.5-5 LPA', peak: '₹10-25 LPA' },
      growth: 70
    },
    {
      degree: 'B.A. Psychology',
      duration: '3 years',
      careers: ['Counselor', 'HR Manager', 'Clinical Psychologist', 'Researcher'],
      government: ['HR Officer', 'Welfare Officer', 'Counselor'],
      private: ['HR Manager', 'Consultant', 'Therapist'],
      salary: { entry: '₹2-4 LPA', peak: '₹8-20 LPA' },
      growth: 65
    },
    {
      degree: 'BBA',
      duration: '3 years',
      careers: ['Business Analyst', 'Marketing Manager', 'Operations Manager', 'Entrepreneur'],
      government: ['Management Trainee', 'Officer', 'Administrator'],
      private: ['Project Manager', 'Business Developer', 'Sales Manager'],
      salary: { entry: '₹3-5 LPA', peak: '₹12-30 LPA' },
      growth: 75
    }
  ];

  const growthData = courseData.map(course => ({
    name: course.degree.split(' ')[1] || course.degree,
    growth: course.growth
  }));

  const filteredCourses = courseData.filter(course =>
    course.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.careers.some(career => career.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('courseMapping.title', 'Course to Career Mapping')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('courseMapping.subtitle', 'Explore how different courses lead to various career opportunities')}
          </p>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses or careers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Career Growth Potential
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="growth" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6">
          {filteredCourses.map((course, index) => (
            <Card key={index} className="shadow-soft hover:shadow-medium transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      {course.degree}
                    </CardTitle>
                    <p className="text-muted-foreground">Duration: {course.duration}</p>
                  </div>
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    {course.growth}% Growth
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="government">Government</TabsTrigger>
                    <TabsTrigger value="private">Private Sector</TabsTrigger>
                    <TabsTrigger value="salary">Salary Info</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        Popular Career Paths
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {course.careers.map((career, idx) => (
                          <Badge key={idx} variant="outline">{career}</Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="government" className="mt-4">
                    <div>
                      <h4 className="font-semibold mb-2">Government Opportunities</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.government.map((job, idx) => (
                          <Badge key={idx} className="bg-primary/10 text-primary">{job}</Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="private" className="mt-4">
                    <div>
                      <h4 className="font-semibold mb-2">Private Sector Roles</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.private.map((job, idx) => (
                          <Badge key={idx} className="bg-secondary/10 text-secondary">{job}</Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="salary" className="mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <h5 className="font-semibold text-sm">Entry Level</h5>
                        <p className="text-2xl font-bold text-primary">{course.salary.entry}</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <h5 className="font-semibold text-sm">Peak Salary</h5>
                        <p className="text-2xl font-bold text-success">{course.salary.peak}</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No courses found matching your search.</p>
          </div>
        )}
      </main>
      
      <ChatBot />
    </div>
  );
};

export default CourseMapping;