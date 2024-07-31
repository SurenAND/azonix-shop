import PaymentEn from '@/src/components/templates/payment/en/PaymentEn';
import PaymentFa from '@/src/components/templates/payment/fa/PaymentFa';
import { useTranslation } from 'react-i18next';

const Payment = () => {
  const { i18n } = useTranslation();
  return i18n.language === 'fa' ? <PaymentFa /> : <PaymentEn />;
};

export default Payment;
