"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Calendar,
  ShoppingBag, 
  Award,
  Shield,
  Clock
} from 'lucide-react';

export default function ProfilePage() {
  // Mock data for demonstration
  const profile = {
    name: "Demo User",
    username: "demouser",
    email: "demo@example.com",
    role: "user",
    vbPoints: 100,
    totalOrders: 5,
    createdAt: new Date().toISOString(),
    isEmailVerified: true
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6">
        {/* Profile Header */}
        <Card className="border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-lg">
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <p className="text-gray-500">{profile.username}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    {profile.role}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    {profile.vbPoints} VB Points
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="info" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Profile Information</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-4 p-4 bg-secondary/10 rounded-lg">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Full Name</p>
                      <p className="text-sm text-gray-500">{profile.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-secondary/10 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-gray-500">{profile.email}</p>
                      {profile.isEmailVerified && (
                        <Badge variant="success" className="mt-1">Verified</Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-secondary/10 rounded-lg">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Account Type</p>
                      <p className="text-sm text-gray-500">Standard Account</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-secondary/10 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Member Since</p>
                      <p className="text-sm text-gray-500">
                        {new Date(profile.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <ShoppingBag className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Total Orders</p>
                        <p className="text-sm text-gray-500">{profile.totalOrders} orders</p>
                      </div>
                    </div>
                    <Button variant="outline">View Orders</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Award className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">VB Points Balance</p>
                        <p className="text-sm text-gray-500">{profile.vbPoints} points</p>
                      </div>
                    </div>
                    <Button variant="outline">Redeem Points</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Last Login</p>
                        <p className="text-sm text-gray-500">Today at {new Date().toLocaleTimeString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}