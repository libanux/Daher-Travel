import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  // {
  //   displayName: 'Analytical',
  //   iconName: 'chart-pie-2',
  //   route: '/dashboards/dashboard1',
  // },
  {
    displayName: 'Dashboard',
    iconName: 'inbox',
    route: '/',
  },
  {
    navCap: 'Apps',
  },
  // {
  //   displayName: 'Contacts',
  //   iconName: 'phone',
  //   route: 'apps/contacts',
  // },
  
  {
    displayName: 'Package',
    iconName: 'packages',
    route: 'apps/packages',
  },
  {
    displayName: 'Visa',
    iconName: 'ticket',
    route: 'apps/visa',
  },
  {
    displayName: 'Labor Recruitment',
    iconName: 'ticket',
    route: 'apps/labors',
  },
  {
    displayName: 'Notes',
    iconName: 'note',
    route: 'apps/notes',
  },
  
  {
    navCap: 'Pages',
  },
  {
    displayName: 'Charts',
    iconName: 'point',
    route: 'widgets/charts',
  },
  {
    displayName: 'Invoice',
    iconName: 'file-invoice',
    route: 'apps/invoice',
  },

  {
    navCap: 'Auth',
  },
  {
    displayName: 'Users',
    iconName: 'brand-ctemplar',
    route: 'apps/employee',
  },
  {
    displayName: 'logout',
    iconName: 'login',
    route: '/authentication/login',
  }
];
