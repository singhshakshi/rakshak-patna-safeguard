import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Menu, 
  User, 
  Settings, 
  TrendingUp, 
  BookOpen, 
  Shield, 
  AlertTriangle,
  Trophy,
  LogOut 
} from 'lucide-react';

export default function NavMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Menu className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-card shadow-lg" align="end">
        <DropdownMenuLabel>
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground">Level {user?.level || 1}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>User Account</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => navigate('/progress')} className="cursor-pointer">
          <Trophy className="mr-2 h-4 w-4" />
          <span>Progress Tracking</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => navigate('/')} className="cursor-pointer">
          <TrendingUp className="mr-2 h-4 w-4" />
          <span>Current Trends</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => navigate('/missions')} className="cursor-pointer">
          <BookOpen className="mr-2 h-4 w-4" />
          <span>Learn Cyber Security</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => navigate('/recent-frauds')} className="cursor-pointer">
          <AlertTriangle className="mr-2 h-4 w-4" />
          <span>Recent Frauds</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}