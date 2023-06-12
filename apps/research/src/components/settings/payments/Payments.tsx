import * as React from 'react';
import SettingsPaymentTitle from './SettingsPaymentTitle';
import PaymentCard from './PaymentCard';
import {
  useCustomerCheckout,
  useCustomerDashboard,
  useProductInfo,
} from '@/hooks';
import { useRouter } from 'next/router';

interface PaymentsProps {
  productId: string;
  priceId: string;
}
const Payments: React.FC<PaymentsProps> = ({ productId, priceId }) => {
  const router = useRouter();
  const [status, state] = useProductInfo(productId);
  const checkout = useCustomerCheckout(priceId);
  const dashboard = useCustomerDashboard();

  // React.useEffect(() => {
  //   router.push(`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/services/auth`);
  // }, [state, router]);

  return (
    <>
      <SettingsPaymentTitle />
      <PaymentCard label="Start 30-Day Free Trial" paymentHandler={checkout} />
    </>
  );
};

export default Payments;
