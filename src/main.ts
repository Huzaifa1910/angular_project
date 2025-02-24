import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(SocketIoModule.forRoot(config))
  ]
}).catch((err) => console.error(err));

// Retrieve the role from sessionStorage
type UserRole = 'admin' | 'super_admin' | 'member' | 'guest';

const endpoints = {
  "admin": [
    { label: 'Dashboard', icon: 'dashboard', route: '/admin-dashboard' },
    { label: 'Projects', icon: 'folder', route: '/projects' },
    { label: 'Members', icon: 'people', route: '/members' },
    { label: 'Files', icon: 'description', route: '/files' },
    { label: 'Chat', icon: 'forum', route: '/chat' }
  ],
  "super_admin": [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Projects', icon: 'folder', route: '/projects' },
    { label: 'Files', icon: 'description', route: '/files' },
    { label: 'Members', icon: 'people', route: '/members' },
    { label: 'Chat', icon: 'forum', route: '/chat' }
  ],
  "member": [
    { label: 'Dashboard', icon: 'dashboard', route: '/member-dashboard' },
    { label: 'Projects', icon: 'folder', route: '/projects' },
    { label: 'Chat', icon: 'forum', route: '/chat' }
  ],
  "guest": []
};

function getNavigationItems(): { label: string, icon: string, route: string }[] {
  const role: UserRole = (sessionStorage.getItem('userRole') as UserRole) || 'guest'; // Default to 'guest' if no role is found
  return endpoints[role] || [];
}

export const navItems = getNavigationItems();
export { getNavigationItems };
console.log(navItems);