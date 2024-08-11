import {
  FaCarSide,
  FaCheckCircle,
  FaHeadphonesAlt,
  FaWallet,
} from 'react-icons/fa';

export const ServicesData = [
  {
    id: 1,
    icon: <FaCarSide className='text-4xl text-primary md:text-5xl' />,
    titleEN: 'Free Shipping',
    titleFa: 'ارسال رایگان',
    descriptionEN: 'Free Shipping On All Order',
    descriptionFa: 'ارسال رایگان برای تمام سفارش ها',
  },
  {
    id: 2,
    icon: <FaCheckCircle className='text-4xl text-primary md:text-5xl' />,
    titleEN: 'Safe Money',
    titleFa: 'امنیت پول',
    descriptionEN: '30 Days Money Back',
    descriptionFa: '30 روز پول برگشت',
  },
  {
    id: 3,
    icon: <FaWallet className='text-4xl text-primary md:text-5xl' />,
    titleEN: 'Secure Payment',
    titleFa: 'پرداخت امن',
    descriptionEN: 'All Payment Secure',
    descriptionFa: 'تمام پرداخت ها امن هستند',
  },
  {
    id: 4,
    icon: <FaHeadphonesAlt className='text-4xl text-primary md:text-5xl' />,
    titleEN: 'Support 24/7',
    titleFa: 'پشتیبانی 24/7',
    descriptionEN: 'Technical Support 24/7',
    descriptionFa: 'پشتیبانی فنی 24/7',
  },
];
