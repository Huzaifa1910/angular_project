import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// Retrieve the role from sessionStorage
type UserRole = 'admin' | 'superadmin' | 'member' | 'guest';
const role: UserRole = (sessionStorage.getItem('userRole') as UserRole) || 'guest'; // Default to 'guest' if no role is found

const endpoints = {
  admin: [
    { label: 'Dashboard', icon: 'dashboard', route: '/admin-dashboard' },
    { label: 'Projects', icon: 'folder', route: '/projects' },
    { label: 'Members', icon: 'people', route: '/members' },
    { label: 'Files', icon: 'description', route: '/files' },
    { label: 'Chat', icon: 'forum', route: '/chat' }
  ],
  superadmin: [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Projects', icon: 'folder', route: '/projects' },
    { label: 'Files', icon: 'description', route: '/files' },
    { label: 'Members', icon: 'people', route: '/members' },
    { label: 'Chat', icon: 'forum', route: '/chat' }
  ],
  member: [
    { label: 'Dashboard', icon: 'dashboard', route: '/member-dashboard' },
    { label: 'Projects', icon: 'folder', route: '/projects' },
    { label: 'Chat', icon: 'forum', route: '/chat' }
  ],
  guest: []
};
export const navItems = endpoints[role] || [];
console.log(navItems);