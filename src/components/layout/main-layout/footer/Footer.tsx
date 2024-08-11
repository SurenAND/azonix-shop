import {
  ImportantLinks,
  QuickLinks,
} from '@/src/components/layout/main-layout/footer/data';
import { MainRoutes } from '@/src/constant/routes';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { FaMobileAlt } from 'react-icons/fa';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
} from 'react-icons/fa6';

export default function Footer() {
  // libraries
  const { t, i18n } = useTranslation();

  return (
    <div className='dark:bg-gray-950'>
      <div className='container'>
        <div className='grid pb-20 pt-5 md:grid-cols-3'>
          {/* company details */}
          <div className='px-4 py-9'>
            <Link
              href={MainRoutes.HOME}
              className={`text-2xl font-bold uppercase text-primary sm:text-3xl ${
                i18n.dir() === 'ltr' ? 'tracking-widest' : ''
              }`}
            >
              {t('company-name')}
            </Link>
            <p className='pt-3 text-gray-600 dark:text-white/70 lg:pe-24'>
              {t('company-info')}
            </p>
            <p className='mt-4 text-gray-500'>{t('made-by')}</p>
            <Link
              href='https://github.com/SurenAND'
              target='_blank'
              className='mt-4 inline-block rounded-full bg-primary/90 px-4 py-2 text-sm text-white'
            >
              {t('more-projects')}
            </Link>
          </div>

          {/* Footer links */}
          <div className='col-span-2 grid grid-cols-2 sm:grid-cols-3 md:ps-10'>
            {/* Important links */}
            <div className='px-4 py-8'>
              <h1 className='mb-3 text-xl font-bold dark:text-white sm:text-start'>
                {t('important-links')}
              </h1>
              <ul className='space-y-3'>
                {ImportantLinks?.map((data) => (
                  <li key={data?.id}>
                    <Link
                      href={data?.links}
                      className='text-gray-600 duration-300 hover:text-black dark:text-gray-400 hover:dark:text-white'
                    >
                      {t(data?.title)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick links */}
            <div className='px-4 py-8'>
              <h1 className='mb-3 text-xl font-bold dark:text-white sm:text-start'>
                {t('quick-links')}
              </h1>
              <ul className='space-y-3'>
                {QuickLinks?.map((data) => (
                  <li key={data?.id}>
                    <Link
                      href={data?.links}
                      className='text-gray-600 duration-300 hover:text-black dark:text-gray-400 hover:dark:text-white'
                    >
                      {t(data?.title)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Address */}
            <div className='col-span-2 px-4 py-8 sm:col-auto'>
              <h1 className='mb-3 text-xl font-bold dark:text-white sm:text-start'>
                {t('address')}
              </h1>
              <div>
                <div className='flex items-center gap-3  dark:text-gray-400'>
                  <FaLocationArrow />
                  <p>{t('company-address')}</p>
                </div>
                <div className='mt-6 flex items-center gap-3 dark:text-gray-400'>
                  <FaMobileAlt />
                  <p>{t('company-phone')}</p>
                </div>

                {/* Social links */}
                <div className='mt-6 flex items-center gap-3 dark:text-gray-400'>
                  <Link href='#'>
                    <FaInstagram className='text-3xl duration-300 hover:text-primary' />
                  </Link>
                  <Link href='#'>
                    <FaFacebook className='text-3xl duration-300 hover:text-primary' />
                  </Link>
                  <Link href='https://www.linkedin.com/in/ashkan-zojaji/'>
                    <FaLinkedin className='text-3xl duration-300 hover:text-primary' />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
