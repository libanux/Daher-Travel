import { NavItem } from '../../../../classes/nav-item';

export const navItems: NavItem[] = [
  {
    displayName: 'Package',
    iconName: 'packages',
    route: 'apps/package',
  },
  {
    displayName: 'wholesaler',
    iconName: 'packages',
    route: 'apps/wholesaler',
  },
  {
    displayName: 'Visa',
    iconName: 'ticket',
    route: 'apps/visa',
  },
  {
    displayName: 'Ticketing',
    iconName: 'ticket',
    route: 'apps/tickets',
  },
  {
    displayName: 'Customers',
    iconName: 'ticket',
    route: 'apps/customers',
  },
  {
    displayName: 'Labor Recruitment',
    iconName: 'clipboard',
    route: 'apps/labors',
  },
  {
    displayName: 'Notes',
    iconName: 'note',
    route: 'apps/notes',
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
