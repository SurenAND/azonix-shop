import { useUserContext } from '@/src/context/authContext';
import useCheckoutStore from '@/src/store/checkout/checkout.store';
import { useEffect, useState } from 'react';
import gregorian from 'react-date-object/calendars/gregorian';
import persian from 'react-date-object/calendars/persian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import persian_en from 'react-date-object/locales/persian_en';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useTranslation } from 'react-i18next';
import { CiCalendar } from 'react-icons/ci';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { DayType, MonthType } from 'shamsi';
import * as shamsi from 'shamsi-date-converter';

const DataPickerInput = () => {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState<{
    format?: string;
    persian?: string;
    gregorian?: string;
    date?: string;
  }>({
    format: 'MM/DD/YYYY',
  });
  const [hasDate, setHasDate] = useState(false);
  const [isValidDate, setIsValidDate] = useState<null | boolean>(null);

  const { setDeliveryDate } = useCheckoutStore();
  const { state } = useUserContext();

  const convert = (date: DateObject | null) => {
    if (date) {
      setValue({
        persian: date.convert(persian, persian_en).format(),
        gregorian: date.convert(gregorian, gregorian_en).format(),
      });
      setHasDate(true);
    }
  };

  useEffect(() => {
    if (hasDate) {
      const selectedDate = shamsi
        .jalaliToGregorian(
          Number(value.persian?.split('/')[0]),
          Number(value.persian?.split('/')[1]) as MonthType,
          Number(value.persian?.split('/')[2]) as DayType,
        )
        .join('/');
      if (new Date(`${selectedDate}`).getTime() > Date.now()) {
        const date = new Date(selectedDate);
        // Add 1 day
        date.setDate(date.getDate() + 1);

        setDeliveryDate({
          date: date.toISOString(),
          userId: state.userId,
        });
        setIsValidDate(true);
      } else {
        setIsValidDate(false);
      }
    }
  }, [value, isValidDate]);

  return (
    <>
      <div className='relative rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white'>
        <DatePicker
          calendar={i18n.language === 'fa' ? persian : gregorian}
          locale={i18n.language === 'fa' ? persian_fa : gregorian_en}
          value={value.date}
          onChange={convert}
          required
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            padding: '1.15rem 0.5rem',
            borderRadius: '0.25rem',
            width: '100%',
            outline: 'none',
            boxShadow: 'none',
          }}
        />
        <CiCalendar className='absolute end-2 top-1/2 -translate-y-1/2 text-2xl' />
      </div>
      {isValidDate === false ? (
        <p className='text-xs font-light text-red-400'>
          {t('delivery-date-error')}
        </p>
      ) : (
        ''
      )}
    </>
  );
};

export default DataPickerInput;
