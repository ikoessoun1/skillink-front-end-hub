import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-xl font-bold text-foreground">SkillLink</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Connecting skilled laborers with clients who need quality work done right.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">For Workers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/browse-jobs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link to="/worker-resources" className="text-muted-foreground hover:text-foreground transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/worker-support" className="text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">For Clients</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/find-workers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Find Workers
                </Link>
              </li>
              <li>
                <Link to="/post-job" className="text-muted-foreground hover:text-foreground transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/client-support" className="text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; 2024 SkillLink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;