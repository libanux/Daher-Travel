import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [

  
  {
    displayName: 'Package',
    iconName: 'packages',
    route: '/',
  },
  {
    displayName: 'Visa',
    iconName: 'ticket',
    route: '/visa',
  },
  {
    displayName: 'Labor Recruitment',
    iconName: 'clipboard',
    route: '/labors',
  },
  {
    displayName: 'Notes',
    iconName: 'note',
    route: '/notes',
  },
  
  {
    displayName: 'Reports',
    iconName: 'layout',
    route: 'widgets/charts',
  },

  {
    navCap: 'Auth',
  },
  {
    displayName: 'Users',
    iconName: 'user-plus',
    route: '/employee',
  },
  {
    displayName: 'Admins',
    iconName: 'user-plus',
    route: '/admins',
  },
  
  {
    displayName: 'logout',
    iconName: 'login',
    route: '/authentication/login',
  }
];
