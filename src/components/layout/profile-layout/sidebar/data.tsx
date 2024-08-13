import {
  MdLocalShipping,
  MdManageAccounts,
  MdPassword,
  MdPolicy,
} from 'react-icons/md';

export const UserSideBarItems = [
  {
    id: 1,
    title: 'account-settings',
    view: 'account-settings',
    icon: <MdManageAccounts />,
  },
  {
    id: 2,
    title: 'change-password',
    view: 'change-password',
    icon: <MdPassword />,
  },
  {
    id: 3,
    title: 'your-orders',
    view: 'your-orders',
    icon: <MdLocalShipping />,
  },
  {
    id: 4,
    title: 'legal-notice',
    view: 'legal-notice',
    icon: <MdPolicy />,
  },
];
