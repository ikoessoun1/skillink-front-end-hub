import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronDown, User, MessageSquare } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardPath = () => {
    return user?.type === 'worker' ? '/worker-dashboard' : '/client-dashboard';
  };

  return (
    <nav className="bg-background border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-xl font-bold text-foreground">SkillLink</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated && user?.type === 'client' && (
              <>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
                <Link to="/find-workers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Find Workers
                </Link>
              </>
            )}
            {!isAuthenticated && (
              <Link to="/find-workers" className="text-muted-foreground hover:text-foreground transition-colors">
                Find Workers
              </Link>
            )}
            {isAuthenticated && user?.type === 'worker' && (
              <Link to="/browse-jobs" className="text-muted-foreground hover:text-foreground transition-colors">
                Find Jobs
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/messages">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Messages
                  </Link>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback>
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:block">{user?.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-popover">
                    {user?.type === 'client' ? (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to="/profile">View Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/settings">Settings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                          Logout
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to={getDashboardPath()}>Dashboard</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/settings">Settings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                          Logout
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
                <Button variant="default" asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;