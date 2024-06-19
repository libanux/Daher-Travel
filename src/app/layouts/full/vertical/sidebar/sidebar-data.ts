import { NavItem } from '../../../../classes/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Travel Management',
  },
  {
    displayName: 'Ticketing',
    iconName: 'ticket',
    route: 'apps/tickets',
  },
  {
    displayName: 'Visa',
    iconName: 'ticket',
    route: 'apps/visa',
  },
  {
    displayName: 'Package',
    iconName: 'packages',
    route: 'apps/package',
  },
  {
    displayName: 'Wholesalers',
    iconName: 'packages',
    route: 'apps/wholesaler/main',
  },


  {
    displayName: 'Customers',
    iconName: 'ticket',
    route: 'apps/customers/main',
  },

  {
    displayName: 'Notes',
    iconName: 'note',
    route: 'apps/notes',
  },
  
  {
    displayName: 'Reports',
    iconName: 'layout',
    route: 'apps/reports',
  },

  {
    navCap: 'Labor Management',
  },
  {
    displayName: 'Labor Recruitment',
    iconName: 'clipboard',
    route: 'apps/labors',
  },
  {
    displayName: 'Labor Reports',
    iconName: 'clipboard',
    route: 'apps/labors',
  },


  {
    navCap: 'User Management',
  },
  {
    displayName: 'Profile',
    iconName: 'ticket',
    route: 'apps/profile',
  },
  {
    displayName: 'Admins',
    iconName: 'user-plus',
    route: 'apps/admins',
  },
  {
    displayName: 'logout',
    iconName: 'login',
    route: '',
  }
];
