import FailedPurchase from '@/src/components/templates/payment-result/failed/FailedPurchase';
import SuccessfulPurchase from '@/src/components/templates/payment-result/successful/SuccessfulPurchase';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PaymentResultTemplate = () => {
  const router = useRouter();
  const { result } = router.query;

  useEffect(() => {
    console.log('result:', result);
    if (
      router.isReady &&
      (!result || (result !== 'successful' && result !== 'failed'))
    ) {
      console.log('Redirecting to home');
      router.push('/');
    }
  }, [router.isReady, result, router]);

  return (
    <>
      {result === 'successful' && <SuccessfulPurchase />}
      {result === 'failed' && <FailedPurchase />}
    </>
  );
};

export default PaymentResultTemplate;
