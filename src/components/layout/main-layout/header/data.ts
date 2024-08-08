import { MainRoutes } from '@/src/constant/routes';

export const MenuLinks = [
  {
    id: 1,
    name: 'home',
    link: MainRoutes.HOME,
  },
  {
    id: 2,
    name: 'shop',
    link: MainRoutes.SHOP,
  },
  {
    id: 3,
    name: 'about',
    link: MainRoutes.ABOUT_US,
  },
  {
    id: 4,
    name: 'blogs',
    link: '/#blogs',
  },
];

export const DropdownLinks = [
  {
    id: 1,
    name: 'dashboard',
    link: MainRoutes.DASHBOARD,
    roleToAccess: ['ADMIN'],
  },
  {
    id: 2,
    name: 'profile',
    link: MainRoutes.PROFILE,
    roleToAccess: ['ADMIN', 'USER'],
  },
];
